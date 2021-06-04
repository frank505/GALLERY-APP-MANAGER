import {body,checkSchema,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateSingleImage } from './CustomFileValidation';
import CustomResponseHelper from '../../helpers/CustomResponseHelper';


const customResponse = new CustomResponseHelper();

 const validateFile = () =>
{
  return checkSchema({
    'image': {  
        custom: {
            options: (value, { req, path }) => {
             return validateSingleImage(req,false)    
            },
            
            errorMessage: `Please upload an image of filetype jpeg,png and jpeg and size less than 2mb`,
        },
       
    },
   
});
}

 const ValidationRules = () => 
{
    const data:Array<any> =  [
      body('title').trim().notEmpty().bail().withMessage('title field is required'),
      
    ];

    data.push(validateFile());

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
    ValidationRules as CreateGalleryRules, 
      ErrMessage as  CreateGalleryErr 
    } 