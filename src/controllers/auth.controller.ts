import { NextFunction, Request, Response } from 'express';
import { TypedRequestBody } from '../interfaces/requests.interfaces';
import { signUpRequest } from '../interfaces/signup.req.interface';
import Recruiter from '../models/recruiters.model';
import bcryptjs from 'bcryptjs';
import Company from '../models/companies.model';
import { randomUUID } from 'crypto';
import Candidate from '../models/candidates.model';
import { generateJwt } from '../middlewares/jwt';
import { loginBody } from '../interfaces/login.req.interface';

export const login = async (
  req: TypedRequestBody<loginBody>,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password || req.body.is_recruiter == null) {
    return res.status(400).json({
      status: 400,
      message: 'Please check the request body',
    });
  }

  let user: any;
  if (req.body.is_recruiter) {
    user = await Recruiter.findOne({ recruiter_email: req.body.email });
  } else {
    user = await Candidate.findOne({ candidate_email: req.body.email });
  }

  if (!user) {
    return res.status(404).json({
      status: 400,
      message: 'User not found',
    });
  }

  const matchPassword = bcryptjs.compareSync(req.body.password, user.password);
  if (matchPassword) {
    const id: string = req.body.is_recruiter
      ? user.recruiter_id
      : user.candidate_id;
    const email: string = req.body.is_recruiter
      ? user.recruiter_email
      : user.candidate_email;
    const name: string = req.body.is_recruiter
      ? user.recruiter_name
      : user.candidate_name;
    const jwt = generateJwt(id, email, next, req.body.is_recruiter);
    return res.status(201).json({
      status: 201,
      message: `${
        req.body.is_recruiter ? 'Recruiter' : 'Candiadte'
      } Logged in successfully`,
      data: {
        id,
        email,
        name,
        jwt,
      },
    });
  } else {
    return res.status(401).json({
      status: 401,
      message: 'Wrong password',
    });
  }
};

export const signUp = async (
  req: TypedRequestBody<signUpRequest>,
  res: Response,
  next: NextFunction
) => {
  if (req.body.is_recruiter) {
    const checkRecruiter = await Recruiter.findOne({
      recruiter_email: req.body.email,
    });
    if (checkRecruiter) {
      return res.status(400).json({
        status: 400,
        message: 'Recruiter with this email already exists',
      });
    }
    const comapnyId: string = await constructCompany(req);
    if (comapnyId == '404') {
      return res.status(400).json({
        status: 400,
        message: 'Company does not exist',
      });
    }
    if (!comapnyId) {
      return res.status(400).json({
        status: 400,
        message:
          'An unknown error occured while performing operation in company',
      });
    }
    const recruiter = await constructRecruiter(req, comapnyId);
    const jwt = generateJwt(
      recruiter.recruiter_id,
      recruiter.recruiter_email,
      next,
      true
    );
    return res.status(201).json({
      status: 201,
      message: 'Recruiter registered successfully',
      data: {
        id: recruiter.recruiter_id,
        email: recruiter.recruiter_email,
        name: recruiter.recruiter_name,
        jwt,
      },
    });
  } else {
    const checkCandidate = await Candidate.findOne({
      candidate_email: req.body.email,
    });
    if (checkCandidate) {
      return res.status(400).json({
        status: 400,
        message: 'Candidate with this email already exists',
      });
    }
    const candidate = await constructCandidate(req);
    const jwt = generateJwt(
      candidate.candidate_id,
      candidate.candidate_email,
      next,
      true
    );
    return res.status(201).json({
      status: 201,
      message: 'Candidate registered successfully',
      data: {
        id: candidate.candidate_id,
        email: candidate.candidate_email,
        name: candidate.candidate_name,
        jwt,
      },
    });
  }
};

const constructCandidate = async (req: TypedRequestBody<signUpRequest>) => {
  const newCandidate = new Candidate();
  if (req.body.email) {
    newCandidate.candidate_email = req.body.email;
  }
  if (req.body.contact) {
    newCandidate.candidate_contact = req.body.contact;
  }
  if (req.body.name) {
    newCandidate.candidate_name = req.body.name;
  }
  if (req.body.isd) {
    newCandidate.isd_code = req.body.isd;
  }
  if (req.body.resume_link) {
    newCandidate.resume = req.body.resume_link;
  }
  newCandidate.password = bcryptjs.hashSync(req.body.password, 10);
  newCandidate.candidate_id = randomUUID();

  await newCandidate.save();
  return newCandidate;
};

const constructRecruiter = async (
  req: TypedRequestBody<signUpRequest>,
  companyId: string
) => {
  const newRecruiter = new Recruiter();
  if (req.body.email) {
    newRecruiter.recruiter_email = req.body.email;
  }
  if (req.body.contact) {
    newRecruiter.recruiter_contact = req.body.contact;
  }
  if (req.body.is_admin) {
    newRecruiter.is_admin = req.body.is_admin;
  }
  if (req.body.name) {
    newRecruiter.recruiter_name = req.body.name;
  }
  if (req.body.isd) {
    newRecruiter.isd_code = req.body.isd;
  }
  if (req.body.role) {
    newRecruiter.role = req.body.role;
  }
  newRecruiter.password = bcryptjs.hashSync(req.body.password, 10);
  newRecruiter.recruiter_id = randomUUID();
  newRecruiter.company_id = companyId;

  await newRecruiter.save();
  return newRecruiter;
};

const constructCompany = async (req: TypedRequestBody<signUpRequest>) => {
  const hasCompany = await Company.findOne({
    company_email: req.body.company_email,
  });
  if (req.body.is_company_already_exists) {
    if (hasCompany) {
      return hasCompany.company_id;
    } else {
      return '404';
    }
  }
  if (hasCompany) {
    return hasCompany.company_id;
  }
  const companyId = randomUUID();
  const newCompany = new Company();
  if (req.body.comapny_address_line1) {
    newCompany.company_address_line1 = req.body.comapny_address_line1;
  }
  if (req.body.comapny_address_line2) {
    newCompany.company_address_line2 = req.body.comapny_address_line2;
  }
  if (req.body.comapny_address_line3) {
    newCompany.company_address_line3 = req.body.comapny_address_line3;
  }
  if (req.body.country) {
    newCompany.country = req.body.country;
  }
  if (req.body.company_name) {
    newCompany.company_name = req.body.company_name;
  }
  if (req.body.company_email) {
    newCompany.company_email = req.body.company_email;
  }
  if (req.body.company_logo) {
    newCompany.company_logo = req.body.company_logo;
  }
  newCompany.company_id = companyId;
  if (req.body.company_size) {
    newCompany.company_size = req.body.company_size;
  }
  await newCompany.save();
  return companyId;
};
