import { Response, Request } from "express";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import GalleryService from '../services/GalleryService';
import fs from 'fs';
import path from "path";
import CustomResponseHelper from "../helpers/CustomResponseHelper";
import { getUserPayload } from "../middleware/jwt/getUserPayload";
import UserService from "../services/UserService";
import {  validateCreateGallery  } from "../middleware/validators/CreateGalleryValidator";
import  formidable from 'formidable';
import { UserEntity } from "../database/entities/UserEntity";
import { UpdateGalleryRules } from "../middleware/validators/UpdateGalleryValidator";




export class GalleryController 
{
 
   public readonly  customResponse:CustomResponseHelper;
   public readonly galleryContent:GalleryService;
   public readonly userService:UserService;

  constructor()
  {
   this.customResponse = new CustomResponseHelper();
   this.galleryContent = new GalleryService();
   this.userService = new UserService();
  }

public  index = async(req:Request,res:Response):Promise <Response> =>
{
   const { id } = getUserPayload(req,res);
   const itemsPerPage:number = 10;
   const page:any =  req.query?.page;
   console.log(page);
   const Gallery = await this.galleryContent.index(id,itemsPerPage,Number(page));
  return this.customResponse.setHttpResponse(200,res,true,'',Gallery);
}

public  uploadFile = async(req:Request,res:Response)=>
{  
  
}

public  create = async(req:Request,res:Response)=>
{
  const form = new formidable.IncomingForm();
  form.parse(req, async (errForm:any, fields:any, files:any) => 
  {
    const validate = validateCreateGallery(fields,files);
    /**
     * validate formfields
     */
    if(validate?.errorStatus==true)
    {
      return this.customResponse.setHttpResponse(400,res,false,validate?.error);
    }
   /**
    * validate user data
    */  
    const { id } = getUserPayload(req,res);
     const user:Promise<UserEntity> = this.userService.getSingleUserDetailsFromId(Number(id));
  
     let oldPath:string = files.image.path;
     const baseDirectory:string = path.join(__dirname, '../public/uploads/gallery');
     !fs.existsSync(baseDirectory)?fs.mkdirSync(baseDirectory):null;
     const ext:string | undefined = files.image.name.split('.').pop();
      const newName:string = Date.now()+'.'+ext;
     const directory:string = baseDirectory+'/'+newName; 
    let rawData = fs.readFileSync(oldPath)
  
     fs.writeFile(directory, rawData, async(err)=>{
        if(err){
         return this.customResponse.setHttpResponse(400,res,false,'failed to upload file');
        }
      
        const dataItem:Object = { 
          title:fields?.title as string,
        user: await user, 
        image:newName as string
       };
      
       const Gallery:GalleryEntity = dataItem as GalleryEntity;
    
        this.galleryContent.create(Gallery);
       
      return this.customResponse.setHttpResponse(200, res, true, 'data saved successfully');  
 
     })
})
}
 

public update =  async(req:Request,res:Response)=>
{
  const form = new formidable.IncomingForm();
  form.parse(req, async (errForm:any, fields:any, files:any) => 
  {
    const validate = UpdateGalleryRules(fields,files);
    /**
     * validate formfields
     */
    if(validate?.errorStatus==true)
    {
      return this.customResponse.setHttpResponse(400,res,false,validate?.error);
    }

  const id:string =  req['params']['id'];
   if(!files.hasOwnProperty('image'))
   {
    return this.updateWithoutNewFile(req,res);
   }

   let oldPath:string = files.image.path;
     const baseDirectory:string = path.join(__dirname, '../public/uploads/gallery');
     !fs.existsSync(baseDirectory)?fs.mkdirSync(baseDirectory):null;
     const ext:string | undefined = files.image.name.split('.').pop();
      const newName:string = Date.now()+'.'+ext;
     const directory:string = baseDirectory+'/'+newName; 
    let rawData = fs.readFileSync(oldPath);
    
    fs.writeFile(directory, rawData, async(err)=>
    {
      if(err){
       return this.customResponse.setHttpResponse(400,res,false,'failed to upload file');
      }
    
      const dataItem:Object = { 
        title:fields?.title as string,
      image:newName as string
     };
    
     const Gallery:GalleryEntity = dataItem as GalleryEntity;
  
      this.galleryContent.update(Gallery, Number(id));
      this.deleteFileAfterUpdateOrDelete(Number(id));
     
    return this.customResponse.setHttpResponse(200, res, true, 'data saved successfully');  

   })

  })
}

public  updateWithoutNewFile =async(req:Request,res:Response) =>
{
   const id:string =  req['params']['id'];
   const {title} = req.body;
   const dataItem:Object = { 
      title:title as string,
   };

   const Gallery:GalleryEntity = dataItem as GalleryEntity;
   await this.galleryContent.update(Gallery, Number(id));
  return  this.customResponse.setHttpResponse(200,res,true,'item edited successfully');

}
 


 public async deleteFileAfterUpdateOrDelete(id:number)
 {
   const singleGallery:GalleryEntity | undefined = await this.galleryContent.getSingleGallery(id);
   const fileName:string | undefined = singleGallery?.image;
   const pathToFile:string = __dirname+'../public/uploads/gallery/'+fileName;
   if (fs.existsSync(pathToFile)) 
   {
      fs.unlinkSync(pathToFile)
    }
 }


public async delete(req:Request,res:Response)
{
   const id:string =  req['params']['id'] as string;
   this.galleryContent.delete(Number(id));
   this.deleteFileAfterUpdateOrDelete(Number(id));
   return this.customResponse.setHttpResponse(200,res,true,'item deleted successfully');

}



}