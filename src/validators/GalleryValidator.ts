import {body,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { isValidImage } from './CustomFileValidation';



export const galleryValidationRules = () => {
    return [
      body('userId').isNumeric(),
      body('title').isString(),
    //   body('file').isValidImage()
    ]
  }

   
  export const validateGallery = (req:Request, res:Response, next:NextFunction) => {
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
  