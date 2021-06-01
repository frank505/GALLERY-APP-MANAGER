import { Response, Request } from "express";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import GalleryService from '../services/GalleryService';
import { body, validationResult } from 'express-validator';
import multer from "multer";
import { upload } from "../multerInstance";
import fs from 'fs';
import CustomResponseHelper from "../helpers/CustomResponseHelper";




const galleryContent:GalleryService = new GalleryService();

export class GalleryController 
{
 
   public readonly  customResponse:CustomResponseHelper;

  constructor()
  {
   this.customResponse = new CustomResponseHelper();
  }

public async index(req:Request,res:Response)
{
   const Gallery = await galleryContent.index();
   res.send(Gallery).json();
}

public async create(req:Request,res:Response)
{
   try{
     let ElemProp =  upload.single('image');
     console.log(ElemProp);
   }catch(ex){}
   const {title, userId} = req.body;
   const files:any = req.files as { [fieldname: string]: Express.Multer.File[]};

   const dataItem:Object = { 
      title:title as string,
    userId:userId as number,
    image:files[0].filename as string
   };
  
   const Gallery:GalleryEntity = dataItem as GalleryEntity;

   const newGallery:GalleryEntity = await galleryContent.create(Gallery);
   
   res.send(this.customResponse.setHttpResponse(200,res, 'data saved successfully'));

}
 

public async update(req:Request,res:Response)
{
   const Gallery = req['body'] as GalleryEntity;
   const id =  req['params']['id'];
   
   res.send(galleryContent.update(Gallery, Number(id)));
}

 
 public async deleteFileAfterUpdateOrDelete(id:number)
 {
   const singleGallery:GalleryEntity | undefined = await galleryContent.getSingleGallery(id);
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
   galleryContent.delete(Number(id));
   this.deleteFileAfterUpdateOrDelete(Number(id));
   res.send(this.customResponse.setHttpResponse(200,res,'item deleted successfully'));

}



}