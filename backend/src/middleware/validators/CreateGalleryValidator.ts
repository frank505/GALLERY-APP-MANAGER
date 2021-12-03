import joi from 'joi';



 const ValidationRules = (requestBody:any,files:any) =>
 {

  const mimeType:Array<any> = ['image/png','image/jpeg','image/jpg','image/gif'];

     const schema:joi.ObjectSchema = joi.object({
         title: joi.string().trim().required(),
       });

       const reqValidate:object = {
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
          errorStatus:true,
          error: 'please select a file'
        }
      }


       if(!mimeType.includes(files.image.type))
       {

        return {
          errorStatus:true,
          error: 'invalid file selected please ensure its a png,jpeg or gif image'
        }

       }

     console.log('got to this point again sha');

       return {
         errorStatus:false,
       };


   }






  export {
    ValidationRules as validateCreateGallery
  }
