import { Response, Request } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import CustomResponseHelper from "../helpers/CustomResponseHelper";
import UserService from "../services/UserService";
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";


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
  const getSingleUser = await this.user.getSingleUserDetails(req.body.email); 
  const checkInvalidEmailOrPassword:Promise<Boolean> = this.
  checkInvalidEmailOrPassword(req,res,getSingleUser); 
  
 if(await checkInvalidEmailOrPassword == false)
 {
  return res.send(this.customResponse.
    setHttpResponse(401,res,false,{email:'invalid email or password'}));
 }
 const token = this.generateJwtToken(getSingleUser);

return res.send(this.customResponse.setHttpResponse(201,res,true,{token:token}));

}


generateJwtToken = (getSingleUser:UserEntity) =>
{
  const signedData:Object =  {type:'user',id:getSingleUser.id,email:getSingleUser.email};
   const token = jwt.sign(signedData,`${process.env.JWT_SECRET_KEY}`,{expiresIn:'24h'});
   return token;
}

 checkInvalidEmailOrPassword = async (req:Request, res:Response,getSingleUser:UserEntity):Promise<Boolean> =>
{
  const count = await this.user.checkEmailAlreadyExist(req.body.email);

  if(count < 0)
  {
   return false;
  }

  const oldPassword:any  = getSingleUser?.password;
 
  const passwordComparisonCheck:boolean = this.checkIfUnencryptedPasswordIsValid(req.body.password,
    oldPassword);
 
    if(passwordComparisonCheck == false)
    {
     return false;
    }
  return true;
}


public  Register = async(req:Request,res:Response)=>
{
  const count = await this.user.checkEmailAlreadyExist(req.body.email);

  if(count > 0)
  {
    return res.send(this.customResponse.setHttpResponse(422,res,false,{email:'email already exist'}));
  }

  const dataToSave:Object = {
   name:req.body.name,
   email:req.body.email,
   password:bcrypt.hashSync(req.body.password,8)
  };


  const User:UserEntity = dataToSave as UserEntity;

  await this.user.createUser(User);
  
  res.send(this.customResponse.setHttpResponse(200, res, true, 'data saved successfully'));
}

 
public checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string , 
  encryptedPassword:string ):boolean=>
{
  return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
}


}