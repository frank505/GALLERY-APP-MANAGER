import { getConnection, getRepository,getCustomRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { PaginationHelper, SkipPosition } from "../helpers/PaginationHelper";
import { GalleryRepository } from "../repository/GalleryRepository";





export default class GalleryService 
{

  

    public async index (id:number,itemsPerPage:number,currPage:number)
    { 
       const skip =  SkipPosition(currPage,itemsPerPage);

        const Gallery = await getCustomRepository(GalleryRepository).
        find({
            order:{
                id:'DESC'
            },
            skip:skip,
            take:itemsPerPage,
            where:{
                user:id
            }
        });
        
      return PaginationHelper(await this.countGalleryItems(id),itemsPerPage,currPage,Gallery);
    }


    public async countGalleryItems (id:number) 
    {
        const countValue =  await getCustomRepository(GalleryRepository).count({
            where:
            [
             {user:id}
            ]
          });

          return countValue;
    }
   
      

    public  async create (Gallery: GalleryEntity)
    {
        const newGallery = await 
        getCustomRepository(GalleryRepository).save(Gallery);
       return newGallery;
    }

    public async update(Gallery: GalleryEntity, id: number)
    {
        const updatedGallery = await 
        getCustomRepository(GalleryRepository).update(id, Gallery);
    return updatedGallery;
    }
    
    public  async delete(id:number) 
    {
       return await getCustomRepository(GalleryRepository).delete(id);
    }


    public async getSingleGallery  (id:number)
    {
        const singleGallery = getCustomRepository(GalleryRepository).findOneOrFail({where:
        [
         {id:id}
        ]});

        return singleGallery;
    }

    

}