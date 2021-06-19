import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import {CreateUserValidationInterface,CreateUserResponseInterface } 
from '../../interfaces/validation/CreateUserInterface';






 const ValidationRules = (requestBody:CreateUserValidationInterface) => 
 {
     const schema:joi.ObjectSchema = joi.object({
         name: joi.string().trim().required(),
         email: joi.string().trim().required().email(),
         password: joi.string().trim().min(8).required(),
       });

       const reqValidate = {
         name:requestBody?.name,
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
    ValidationRules as RegisterUserValidation
  }