import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import {CreateUserValidationInterface,CreateUserResponseInterface } 
from '../../interfaces/validation/CreateUserInterface';
import ValidationException from '../CustomErrorException/ValidationExceptionHandler';





 const ValidationRules = (requestBody:CreateUserValidationInterface,
   res:Response) => 
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
     
      try{
        ErrMessage(responseValidation,res);
      }catch(ex)
      {
        res.status(ex.status).send(
          {
            status:ex.success,
            response: {
              message:ex.message.message,
            }
          }
          );
      }
      
  
   }
 


     
   const ErrMessage = (errors:any,res:Response) => 
   {

      if(errors.hasOwnProperty('error'))
      {
        throw new ValidationException(422,false, errors?.error?.details[0]);
        
       }

   }


  export {
    ValidationRules as RegisterUserValidation
  }