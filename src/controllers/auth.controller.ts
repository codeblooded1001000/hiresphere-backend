import {Request, Response} from "express"
import { TypedRequestBody } from "../interfaces/requests.interfaces";
import { signUpRequest } from "../interfaces/signup.req.interface";

export const login = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Okay"
  });
}

export const signUp = (req: TypedRequestBody<signUpRequest>, res: Response) => {
  
}