import { getConnection, getRepository,getCustomRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { GalleryRepository } from "../repository/GalleryRepository";





export default class GalleryService 
{

  

    public index = async()=>
    {
        const Gallery = await getCustomRepository(GalleryRepository).find();
        return Gallery;
    }
   
    

    public create = async(Gallery: GalleryEntity)=>
    {
        const newGallery = await 
        getCustomRepository(GalleryRepository).save(Gallery);
       return newGallery;
    }

    public update = async(Gallery: GalleryEntity, id: number)=>
    {
        const updatedGallery = await 
        getCustomRepository(GalleryRepository).update(id, Gallery);
    return updatedGallery;
    }
    
    public  delete = async(id:number) =>
    {
        const deletedGallery = await getCustomRepository(GalleryRepository)
        .delete(id);
    return deletedGallery;
    }


    public getSingleGallery = async(id:number)=>
    {
        const singleGallery = getCustomRepository(GalleryRepository).findOneOrFail({where:
        [
         {id:id}
        ]});

        return singleGallery;
    }

    

}