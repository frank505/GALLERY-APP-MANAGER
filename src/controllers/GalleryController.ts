import { Response, Request } from "express";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import GalleryService from '../services/GalleryService';
import { body, validationResult } from 'express-validator';
import multer from "multer";
import { upload } from "../multerInstance";


const galleryContent:GalleryService = new GalleryService();

export class GalleryController 
{

// private galleryService:GalleryService;

//  constructor()
//  {
//     this.galleryService = new GalleryService();
//  }
 

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
      title:title,
    userId:userId,
    image:files[0].filename
   };
  
   const Gallery:GalleryEntity = dataItem as GalleryEntity;

   const newGallery = await galleryContent.create(Gallery);
   
   res.send(newGallery);

}
 

public async update(req:Request,res:Response)
{
   const Gallery = req['body'] as GalleryEntity;
   const id =  req['params']['id'];
   
   res.send(galleryContent.update(Gallery, Number(id)));
}

public async delete(req:Request,res:Response)
{
   const id =  req['params']['id'];
   res.send(galleryContent.delete(Number(id)));
}



}