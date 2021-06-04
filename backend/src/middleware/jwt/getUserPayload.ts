import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import CustomResponseHelper from "../../helpers/CustomResponseHelper";

const customResponse = new CustomResponseHelper();

export const getUserPayload = (req: Request, res: Response) => 
{
  //Get the jwt token from the head
  const tokenWithBearer = <string>req.headers["authorization"];
  const splitTokenWithBearer = tokenWithBearer.split(' ');
  const token = splitTokenWithBearer[1];
  
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    res.locals.jwtPayload = jwtPayload;
    console.log(jwtPayload);
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return customResponse.setHttpResponse(401,res,false,'unathorized');
  }
  return jwtPayload; 
}