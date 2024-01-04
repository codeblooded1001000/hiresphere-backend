import { educationDto } from "../dto/education.interface";

export interface candidateSignUpRequest {
  email: string,
  password: string,
  contact: string,
  isd: string,
  name: string,
  resume_link: string,
  country: string,
  primary_role: string,
  skills: string[],
  experience: string,
  education: educationDto[]
}