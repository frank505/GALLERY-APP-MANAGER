import  multer from "multer";
import  path from 'path';
import fs from 'fs';

const storage:multer.StorageEngine = multer.diskStorage({
    destination: function (req , file, cb) 
    {
        console.log(req.body);
        const fileDirectory = req.headers.filedirectory;
        const baseDirectory:string = __dirname+'/public/uploads';
       const directory:string = baseDirectory+'/'+fileDirectory; 

       fileDirectory!=null || fileDirectory!=undefined ? 
        !fs.existsSync(directory) && fs.mkdirSync(directory) : null;
     
        const uploadTo:any = fileDirectory==null || fileDirectory==undefined? baseDirectory:directory; 

      cb(null, uploadTo)
    },
    filename: function (req:any, file:any, cb) {
        let extension:any = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now()+'.'+extension)
    }
  })
  
  export const upload:any = multer({storage:storage}).any();