import { GalleryEntity } from "../../database/entities/GalleryEntity";
import GalleryService from "../../services/GalleryService";
import * as Repository from "typeorm";


  


jest.mock('typeorm', () => {

  const typeOrm = {
    getRepository:jest.fn().mockImplementation(()=>{
      return{
        save:jest.fn(),
        findOneOrFail:jest.fn(),
        count:jest.fn(),
        update:jest.fn(),
        find:jest.fn(),
        delete:jest.fn()
      }
    }),
    ObjectType(){}, 
    Entity(){},
    InputType(){},
    Index(){},
    PrimaryGeneratedColumn(){},
    Column(){},
    CreateDateColumn(){},
    UpdateDateColumn(){},
    OneToMany(){},
    ManyToOne(){},
    JoinColumn(){}
  };
  return typeOrm;
});


describe('jest describe', () => {

    afterEach(()=>{
      jest.restoreAllMocks();
    })

    it('index', async() => {
      const Gallery = new GalleryService;
      const newGallery:GalleryEntity  = {};
      const data:any = {}
      await Gallery.index(1,1,1);
      expect(Repository.getRepository).toHaveBeenCalled();
    });
  
   it('create',async()=>{
     const Gallery = new GalleryService;
     const id:number = 1;
     const newGallery:GalleryEntity  = {};
     await Gallery.create(newGallery);
     expect(Repository.getRepository).toHaveBeenCalled();
   });

   it('update',async()=>{
    const Gallery = new GalleryService;
    const id:number = 1;
    const newGallery:GalleryEntity  = {};
    await Gallery.update(newGallery,id);
    expect(Repository.getRepository).toHaveBeenCalled();
   })


   it('delete',async()=>{
    const Gallery = new GalleryService;
    const id:number = 1;
    await Gallery.delete(id);
    expect(Repository.getRepository).toHaveBeenCalled();
   });
   
   it('getSingleGallery',async()=>{
    const Gallery = new GalleryService;
    const id:number = 1;
    await Gallery.getSingleGallery(id);
    expect(Repository.getRepository).toHaveBeenCalled();
   })
   


  });


   




 



