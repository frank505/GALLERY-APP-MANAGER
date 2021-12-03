import { UserEntity } from "../database/entities/UserEntity";
import * as jwt from "jsonwebtoken";

export const generateJwtToken = (getSingleUser:UserEntity) =>
{
  const signedData:Object =  {type:'user',id:getSingleUser.id,email:getSingleUser.email};
  console.log(`${process.env.JWT_SECRET_KEY}`);
   const token:any = jwt.sign(signedData,`${process.env.JWT_SECRET_KEY}`,{expiresIn:'24h'});
   return token;
}
