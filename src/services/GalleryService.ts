import { getConnection } from "typeorm";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { GalleryRepository } from "../repository/GalleryRepository";



export class GalleryService 
{

    private GalleryRepository:GalleryRepository

    constructor()
    {
      this.GalleryRepository = getConnection('default').getCustomRepository(GalleryRepository);
    }


    public async index()
    {
     const Gallerys = await this.GalleryRepository.find();
     return Gallerys;
    }


    public async create(Gallery: GalleryEntity)
    {
        const newGallery = await this.GalleryRepository.save(Gallery);
    return newGallery;
    }

    public async update(Gallery: GalleryEntity, id: number)
    {
        const updatedGallery = await this.GalleryRepository.update(id, Gallery);
    return updatedGallery;
    }
    
    public async delete(id:number)
    {
        const deletedGallery = await this.GalleryRepository.delete(id);
    return deletedGallery;
    }

}