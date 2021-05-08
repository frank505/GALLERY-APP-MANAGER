import {body,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { isValidImage } from './CustomFileValidation';




export const galleryValidationRules = () => {
    return [
  body('title').trim().notEmpty().withMessage('title field is required'),
  body('userId').trim().notEmpty().isNumeric().withMessage('user id can only be an integer'),
  body('image').exists().custom(isValidImage)
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
  