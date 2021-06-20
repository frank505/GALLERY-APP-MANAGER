import { getCustomRepository } from "typeorm";
import { GalleryRepository } from "../../repository/GalleryRepository";



describe('Gallery Repository exists',  ()=>{

       it('user custom repository exist', async () =>
       {
          expect(GalleryRepository).toBeDefined();
       });
   
  
   })