import { AppUserRole } from "../enum/AppUserRole.enum";

export interface AppUser{
  id :number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  appUserRole:AppUserRole;
  enabled:boolean
  name: string;
  telNumber: number;
  address: string;
  cin: string;
}