import { getConnection, getRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { GalleryRepository } from "../repository/GalleryRepository";





export default class GalleryService 
{


    public async index()
    {
        const Gallery = await (await connection()).getCustomRepository(GalleryRepository).find();
        return Gallery;
    }
   
    

    public async create(Gallery: GalleryEntity)
    {
        const newGallery = await (await connection()).
        getCustomRepository(GalleryRepository).save(Gallery);
       return newGallery;
    }

    public async update(Gallery: GalleryEntity, id: number)
    {
        const updatedGallery = await (await connection()).
        getCustomRepository(GalleryRepository).update(id, Gallery);
    return updatedGallery;
    }
    
    public async delete(id:number)
    {
        const deletedGallery = await (await connection()).getCustomRepository(GalleryRepository)
        .delete(id);
    return deletedGallery;
    }


    public async getSingleGallery(id:number)
    {
        const singleGallery = await (await connection()).
        getCustomRepository(GalleryRepository).findOne({where:
        [
         {id:id}
        ]});

        return singleGallery;
    }

    

}