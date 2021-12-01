import 'reflect-metadata'
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
import  {UserEntity}  from "../database/entities/UserEntity";
import { UpdateGalleryRules } from "../middleware/validators/UpdateGalleryValidator";
import { autoInjectable } from "tsyringe";
import IncomingForm from 'formidable/Formidable';
import ErrnoException = NodeJS.ErrnoException;



@autoInjectable()

export class GalleryController
{

   public readonly  customResponse:CustomResponseHelper;
   public readonly galleryContent:GalleryService;
   public readonly userService:UserService;

  constructor(
    customResponse:CustomResponseHelper,
    galleryContent:GalleryService,userService:UserService)
  {
   this.customResponse = customResponse;
   this.galleryContent = galleryContent;
   this.userService = userService;
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



public  create = async(req:Request,res:Response)  =>
{

  const form:IncomingForm = new formidable.IncomingForm();

  form.parse(req, async (errForm:any, fields:any, files:any) =>
  {
    const validate = validateCreateGallery(fields,files);
    /**
     * validate formfields
        */
    if(validate?.errorStatus)
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
    return await this.writeFileOnCreate(directory,rawData,res,user,newName,fields);
})

}


public writeFileOnCreate = async (directory:string,
  rawData:any,res:Response,user:Promise<UserEntity>,
  newName:string,fields:any) =>
{
 await fs.writeFile(directory, rawData, async(err:ErrnoException|null)=>
 {
    if(err)
    {
     return this.customResponse.setHttpResponse(400,res,false,'failed to upload file');
    }

    const dataItem:Object =
    {
    title:fields?.title as string,
    user: await user,
    image:newName as string
    };

   const Gallery:GalleryEntity = dataItem as GalleryEntity;

   await this.galleryContent.create(Gallery);

  return this.customResponse.setHttpResponse(200, res, true, 'data saved successfully');

 });

}


public update =  async(req:Request,res:Response):Promise<any> =>
{


  const form = new formidable.IncomingForm();
  form.parse(req, async (errForm:any, fields:any, files:any) =>
  {
    const validate = UpdateGalleryRules(fields,files);
    /**
     * validate formfields
     */
    if(validate?.errorStatus)
    {
      return this.customResponse.setHttpResponse(400,res,false,validate?.error);
    }

  const id:string =  req['params']['id'];
   if(!files.hasOwnProperty('image'))
   {
    return this.updateWithoutNewFile(req,res,fields);
   }

   let oldPath:string = files.image.path;
     const baseDirectory:string = path.join(__dirname, '../public/uploads/gallery');
     !fs.existsSync(baseDirectory)?fs.mkdirSync(baseDirectory):null;
     const ext:string | undefined = files.image.name.split('.').pop();
      const newName:string = Date.now()+'.'+ext;
     const directory:string = baseDirectory+'/'+newName;
    let rawData = fs.readFileSync(oldPath);
    return await this.writeFileOnEdit(directory,rawData,res,newName,fields,id);
  })

}

public writeFileOnEdit = (directory:string,
  rawData:any,res:Response,
  newName:string,fields:any,id:string) =>
{
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
}


public  updateWithoutNewFile =async(req:Request,res:Response,fields:any):Promise <Response> =>
{
   const id:string =  req['params']['id'];
   const title = req.body?.title==null ? fields?.title : req.body.title;
   const dataItem:Object = {
      title:title as string,
   };

   const Gallery:GalleryEntity = dataItem as GalleryEntity;
   await this.galleryContent.update(Gallery, Number(id));
  return  this.customResponse.setHttpResponse(200,res,true,'item edited successfully');

}



 public  deleteFileAfterUpdateOrDelete = async (id:number)  =>
 {
   const singleGallery:GalleryEntity | undefined = await this.galleryContent.getSingleGallery(id);
   const fileName:string | undefined = singleGallery?.image;
   const pathToFile:string =  path.join(__dirname,`../public/uploads/gallery/${fileName}`);
   if (fs.existsSync(pathToFile))
   {
      fs.unlinkSync(pathToFile)
    }
 }


public  delete = async(req:Request,res:Response) :Promise <Response> =>
{
   const id:string =  req['params']['id'] as string;
   await this.galleryContent.delete(Number(id));
   this.deleteFileAfterUpdateOrDelete(Number(id));
   return this.customResponse.setHttpResponse(200,res,true,'item deleted successfully');

}



}
