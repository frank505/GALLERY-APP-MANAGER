import { getRepository } from "typeorm";
import { GalleryEntity } from "../database/entities/GalleryEntity";
import { PaginationHelper, SkipPosition } from "../helpers/PaginationHelper";






export default class GalleryService
{



    public async index (id:number,itemsPerPage:number,currPage:number)
    {
       const skip =  SkipPosition(currPage,itemsPerPage);

        const Gallery = await getRepository(GalleryEntity).
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
        const countValue =  await getRepository(GalleryEntity).count({
            where:
            [
             {user:id}
            ]
          });

          return countValue;
    }
   


    public  async create (Gallery: GalleryEntity)
    {
        return await getRepository(GalleryEntity).save(Gallery);

    }

    public async update(Gallery: GalleryEntity, id: number)
    {
       return await getRepository(GalleryEntity).update(id, Gallery);
    }

    public  async delete(id:number)
    {
       return await getRepository(GalleryEntity).delete(id);
    }


    public async getSingleGallery  (id:number)
    {
        return getRepository(GalleryEntity).findOneOrFail({where:
        [
         {id:id}
        ]});

    }



}
