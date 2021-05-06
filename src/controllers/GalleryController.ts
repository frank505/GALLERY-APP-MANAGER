import { Router, Response, Request } from "express";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import {GalleryService} from '../services/GalleryService';




export class GalleryController 
{
public router:Router;
private GalleryService:GalleryService;

constructor()
{
    this.router = Router();
    this.GalleryService = new GalleryService();
}


public async index(req:Request,res:Response)
{
   const Gallery = await this.GalleryService.index();
   res.send(Gallery).json();
}

public async create(req:Request,res:Response)
{
   const Gallery = req['body'] as GalleryEntity;
    const newGallery = await this.GalleryService.create(Gallery);
    res.send(newGallery)
}


public async update(req:Request,res:Response)
{
   const Gallery = req['body'] as GalleryEntity;
   const id =  req['params']['id'];
   
   res.send(this.GalleryService.update(Gallery, Number(id)));
}

public async delete(req:Request,res:Response)
{
   const id =  req['params']['id'];
   res.send(this.GalleryService.delete(Number(id)));
}


  /**
   * Configure the routes of controller
   */
   public routes()
   {
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

}