import { Response, Request } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import CustomResponseHelper from "../helpers/CustomResponseHelper";
import UserService from "../services/UserService";




export class AuthController
{
 
  public readonly customResponse:CustomResponseHelper;
  public readonly user:UserService;
    
  constructor()
  {
   this.customResponse = new CustomResponseHelper();
    this.user = new UserService();
  }

public  Login = async(req:Request,res:Response) =>
{
   
}

public  Register = async(req:Request,res:Response)=>
{
  const User:UserEntity = req.body as UserEntity;

  await this.user.createUser(User);
  
  res.send(this.customResponse.setHttpResponse(200, res, true, 'data saved successfully'));
}



}