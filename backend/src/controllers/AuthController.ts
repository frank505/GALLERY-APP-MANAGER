import 'reflect-metadata'
import { Response, Request } from "express";
import  {UserEntity}  from "../database/entities/UserEntity";
import CustomResponseHelper from "../helpers/CustomResponseHelper";
import * as bcrypt from 'bcryptjs';
import { RegisterUserValidation} from "../middleware/validators/RegisterUserValidator";
import { CreateUserResponseInterface,
   CreateUserValidationInterface } from "../interfaces/validation/CreateUserInterface";
import { LoginUserValidation } from "../middleware/validators/LoginUserValidator";
import { LoginUserValidationInterface } from "../interfaces/validation/LoginUserInterface";
import { generateJwtToken } from "../helpers/generateJwt";
import { IUserService } from "../interfaces/services/IUserService";
import { autoInjectable, injectable } from "tsyringe";
import UserService from "../services/UserService";
import ICustomResponseHelper from '../interfaces/customresponse/ICustomResponseHelper';



 @autoInjectable()

export class AuthController
{
 
  public readonly customResponse:ICustomResponseHelper;
  public readonly user:UserService;
    
  constructor(userService:UserService,customResponse:CustomResponseHelper)
  {
   this.customResponse = customResponse;
    this.user = userService;
  }

public   Login = async(req:Request,res:Response) =>{
  const bodyItem:LoginUserValidationInterface = req.body; 

  const validate =  LoginUserValidation(bodyItem);

  if(validate?.errorStatus == true)
  {
    return this.customResponse.setHttpResponse(422,res,false,validate?.error);
  }

  try{

    const getSingleUser:UserEntity = await this.user.getSingleUserDetails(req.body.email); 

    const checkInvalidEmailOrPassword:Promise<Boolean> =
     this.checkInvalidPassword(req,res,getSingleUser); 
    
   if(await checkInvalidEmailOrPassword == false)
   {
    return this.customResponse.
      setHttpResponse(401,res,false,{messgae:'invalid email or password'});
   }
   const token = generateJwtToken(getSingleUser);
  
  return this.customResponse.setHttpResponse(201,res,true,{token:token});

  }catch(ex)
  {
      return this.customResponse.
      setHttpResponse(401,res,false,{message:'invalid email or password',error:ex});
  }
  
}

 

  checkInvalidPassword = async(req:Request, res:Response,getSingleUser:UserEntity):
 Promise<Boolean> =>{
 
  const oldPassword:any  = getSingleUser?.password;
 
  const passwordComparisonCheck:boolean = 
  this.checkIfUnencryptedPasswordIsValid(req.body.password,
    oldPassword);
 
    if(passwordComparisonCheck == false)
    {
     return false;
    }
  return true;
}

 
public  Register = async(req:Request,res:Response)=>
{
  const bodyItem:CreateUserValidationInterface = req.body; 

 const validate:any =   RegisterUserValidation(bodyItem);

 if(validate?.errorStatus == true)
 {
   return this.customResponse.setHttpResponse(422,res,false,validate?.error);
 }

  const count = await this.user.checkEmailAlreadyExist(req.body.email);

  if(count > 0)
  { 
    return this.customResponse.setHttpResponse(422,res,false,{message:'email already exist'});
  }

  const dataToSave:Object = {
   name:req.body.name,
   email:req.body.email,
   password:bcrypt.hashSync(req.body.password,8)
  };

 
  const User:UserEntity = dataToSave as UserEntity;

  await this.user.createUser(User);

  
  return this.customResponse.setHttpResponse(200, res, true, 'data saved successfully');
}

 
public checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string , 
  encryptedPassword:string ):boolean=>
{
  return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
}


}