import {body,checkSchema,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import CustomResponseHelper from '../../helpers/CustomResponseHelper';


const customResponse = new CustomResponseHelper();

 const ValidationRules = () => 
 {
     const data:Array<any> =  [
       body('name').trim().notEmpty().bail().withMessage('name field is required'),
       body('email').trim().notEmpty().bail().withMessage('email field is required'),
       body('email').isEmail().bail().withMessage('incorrect email entered, please enter a valid email'),
       body('password').trim().notEmpty().withMessage('password field is required'),
       body('password').isLength({min:8}).withMessage('password must be more than 7 characters'),
     ];
    

     return data;
 
   }
 


     
   const ErrMessage = (req:Request, res:Response, next:NextFunction) => 
   {
     const errors = validationResult(req)
     if (errors.isEmpty()) {
       return next()
     }
     const extractedErrors:any = [];
     errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
   
    return customResponse.setHttpResponse(422,res,false,extractedErrors);
   }


   export {
    ValidationRules as RegisterUserRules, 
      ErrMessage as  RegisterUserErr 
    } 