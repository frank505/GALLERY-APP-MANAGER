import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import {LoginUserValidationInterface,LoginUserResponseInterface } 
from '../../interfaces/validation/LoginUserInterface';
import ValidationException from '../CustomErrorException/ValidationExceptionHandler';





 const ValidationRules = (requestBody:LoginUserValidationInterface,
   res:Response) => 
 {
     const schema:joi.ObjectSchema = joi.object({
         email: joi.string().trim().required().email(),
         password: joi.string().trim().min(8).required(),
       });

       const reqValidate = {
         email:requestBody?.email,
         password:requestBody?.password
       }
    
      const responseValidation:any = schema.validate(reqValidate);

      if(responseValidation.hasOwnProperty('error'))
      {
         return {
           errorStatus:true, 
           error: responseValidation?.error?.details[0]?.message
         }
      }
      
       return {
         errorStatus:false
       };
  
   }
 


  


  export {
    ValidationRules as LoginUserValidation
  }