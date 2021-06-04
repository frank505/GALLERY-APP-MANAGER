import { Response, Request } from "express";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import GalleryService from '../services/GalleryService';
import { body, validationResult } from 'express-validator';
import multer from "multer";
import { upload } from "../multerInstance";
import fs from 'fs';
import CustomResponseHelper from "../helpers/CustomResponseHelper";
import { getUserPayload } from "../middleware/jwt/getUserPayload";
import UserService from "../services/UserService";




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
  return res.send(Gallery).json();
}

public  uploadFile = async(req:Request,res:Response)=>
{
   try{
      upload.single('image');
    }catch(ex){}
}

public  create = async(req:Request,res:Response)=>
{
     this.uploadFile(req,res);
   const {title} = req.body;
   const files:any = req.files as { [fieldname: string]: Express.Multer.File[]};
   
   const { id } = getUserPayload(req,res);
   const user = this.userService.getSingleUserDetailsFromId(Number(id));
    
   const dataItem:Object = { 
      title:title as string,
    user:await user, 
    image:files[0].filename as string
   };
  
   const Gallery:GalleryEntity = dataItem as GalleryEntity;

   await this.galleryContent.create(Gallery);
   
   res.send(this.customResponse.setHttpResponse(200, res, true, 'data saved successfully' ) );

}
 

public update =  async(req:Request,res:Response)=>
{
  const id:string =  req['params']['id'];
   if(req.body.image==null || req.body.image=='')
   {
    return this.updateWithoutNewFile(req,res);
   }

   const files:any = req.files as { [fieldname: string]: Express.Multer.File[]};
   const {title, userId} = req.body;
   this.deleteFileAfterUpdateOrDelete(Number(id));
   this.uploadFile(req,res);
   const dataItem:Object = { 
      title:title as string,
   //  userId:userId as number,
    image:files[0].filename as string
   };
   const Gallery:GalleryEntity = dataItem as GalleryEntity;
    await this.galleryContent.update(Gallery, Number(id));
   return  res.send(this.customResponse.setHttpResponse(200,res,true,'item edited successfully'));
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
  return  res.send(this.customResponse.setHttpResponse(200,res,true,'item edited successfully'));

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
   res.send(this.customResponse.setHttpResponse(200,res,true,'item deleted successfully'));

}



}