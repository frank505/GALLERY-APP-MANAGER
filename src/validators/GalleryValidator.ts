import {body,checkSchema,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateSingleImage } from './CustomFileValidation';



export const validateFile = () =>
{
  return checkSchema({
    'image': {  
        custom: {
            options: (value, { req, path }) => {
             return validateSingleImage(req)    
            },
            
            errorMessage: `Please upload an image of filetype jpeg,png and jpeg and size less than 2mb`,
        },
       
    },
   
});
}

export const galleryValidationRules = () => 
{
    const data:Array<any> =  [
      body('title').trim().notEmpty().bail().withMessage('title field is required'),
      body('userId').trim().isNumeric().bail().withMessage('user id can only be an integer'),
      
    ];

    data.push(validateFile());

    return data;

  }

   
  export const validateGalleryErrMessage = (req:Request, res:Response, next:NextFunction) => 
  {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors:any = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  