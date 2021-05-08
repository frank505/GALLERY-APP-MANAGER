import { body, CustomValidator } from 'express-validator';

export const isValidImage: CustomValidator = (value,filename) => 
 {
    const acceptedFileTypes:Array<string> = ['image/jpeg','image/jpg','image/jpg'];
     console.log('this is the value');
     console.log(value);
     console.log('this is the filename');
  
    


     console.log(filename.req.files[0].originalname);
 
    let mimeType:string = filename.req.files[0].mimetype;
    let fileSizeLimit:number = 2 * 1024 *1024; //2mb
    let fileSize:number = filename.req.files[0].size;
    /**
     * check against mimetype
     */
     if(!acceptedFileTypes.includes(mimeType))
     {
        return Promise.reject({
            invalid_file:'file type is invalid'
        });
     }      
        /**
         * check file size
         */
        if(fileSize > fileSizeLimit)
        {
            return Promise.reject({
                invalid_file:'uploaded file is too large'
            });
        }
    
 };
  


