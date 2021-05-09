import {  CustomValidator } from 'express-validator';

export const isValidImage: CustomValidator = (value,filename) => 
 {
    const acceptedFileTypes:Array<string> = ['image/jpeg','image/jpg','image/jpg'];

     if(filename.req.files[0]==undefined)
     {
      return Promise.reject('file type is invalid');
     }

 
    let mimeType:string = filename.req.files[0].mimetype;
    let fileSizeLimit:number = 2 * 1024 *1024; //2mb in binary
    let fileSize:number = filename.req.files[0].size;
    /**
     * check against mimetype
     */
     if(!acceptedFileTypes.includes(mimeType))
     {
        return Promise.reject('file type is invalid');
     }      
        /**
         * check file size
         */
        if(fileSize > fileSizeLimit)
        {
            return Promise.reject('uploaded file is too large');
        }
        
    
 };
  


