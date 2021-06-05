import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import {CreateGalleryValidationInterface,CreateGalleryResponseInterface } from '../../interfaces/validation/CreateGalleryInterface';





 const ValidationRules = (requestBody:CreateGalleryValidationInterface,
   res:Response):CreateGalleryResponseInterface => 
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

      console.log(responseValidation);
      
      const responseData:CreateGalleryResponseInterface = {
        error: responseValidation.error?.details[0]?.message, 
        success :ErrMessage(responseValidation,res)
      }

     return responseData;
   }
 


     
   const ErrMessage = (errors:Object,res:Response):boolean => 
   {
     console.log(errors);
    const arrayObj:Array<any> = [];
      if(errors.hasOwnProperty('error'))
      {
       return false;
      }

      return true;
      
   }


  export {
    ValidationRules as GalleryValidation
  }