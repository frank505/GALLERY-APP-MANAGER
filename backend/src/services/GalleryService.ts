import { getConnection, getRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { GalleryRepository } from "../repository/GalleryRepository";





export default class GalleryService 
{

  

    public index = async()=>
    {
        const Gallery = await (await connection()).getCustomRepository(GalleryRepository).find();
        return Gallery;
    }
   
    

    public create = async(Gallery: GalleryEntity)=>
    {
        const newGallery = await (await connection()).
        getCustomRepository(GalleryRepository).save(Gallery);
       return newGallery;
    }

    public update = async(Gallery: GalleryEntity, id: number)=>
    {
        const updatedGallery = await (await connection()).
        getCustomRepository(GalleryRepository).update(id, Gallery);
    return updatedGallery;
    }
    
    public  delete = async(id:number) =>
    {
        const deletedGallery = await (await connection()).getCustomRepository(GalleryRepository)
        .delete(id);
    return deletedGallery;
    }


    public getSingleGallery = async(id:number)=>
    {
        const singleGallery = await (await connection()).
        getCustomRepository(GalleryRepository).findOneOrFail({where:
        [
         {id:id}
        ]});

        return singleGallery;
    }

    

}