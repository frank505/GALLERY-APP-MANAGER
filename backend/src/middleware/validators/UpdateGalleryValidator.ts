import joi from 'joi';






 const ValidationRules = (requestBody:any,files:any) => 
{
   
    const mimeType = ['image/png','image/jpeg','image/jpg','image/gif'];

    const schema:joi.ObjectSchema = joi.object({
        title: joi.string().trim().required(),
        userId: joi.number().valid(),
      });

      const reqValidate = {
        title:requestBody?.title,
      }
   
     const responseValidation:any = schema.validate(reqValidate);
   
     if(responseValidation.hasOwnProperty('error'))
     {
        return {
          errorStatus:true, 
          error: responseValidation?.error?.details[0]?.message
        }
     }

     if(!files.hasOwnProperty('image'))
     {
       return {
         errorStatus:false, 
       }
     }
     
      if(!mimeType.includes(files.image.type))
      {
       return {
         errorStatus:true, 
         error: 'invalid file selected please ensure its a png,jpeg or gif image'
       }
      }

      return {
        errorStatus:false
      };
     

  }

   
  

  export { 
    ValidationRules as UpdateGalleryRules, 
  } 