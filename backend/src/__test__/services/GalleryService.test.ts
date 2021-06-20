import { getManager,getRepository } from "typeorm";
import { GalleryEntity } from "../../database/entities/GalleryEntity";
import { UserEntity } from "../../database/entities/UserEntity";
import { connection } from "../database/databaseConnection";
import GalleryService from "../../services/GalleryService";


const galleryService = new GalleryService();

const dataToSave:any = {
    name:"desmond",
   email:"akpufranklin222@gmail.com",
   password:"srtewasdfghjytr234ES345rffr"
  };

const User:UserEntity = dataToSave as UserEntity;

const createNewUser = async() =>
{  
   await getRepository(UserEntity).insert(dataToSave);
   return User;
}


const createNewGallery = async(user:any) =>
{
    const galleryData:any = {
        title:"this is the title",
        image:'dddddd.png',
        user: await user
       };
     
     const Gallery:GalleryEntity = galleryData as GalleryEntity;

    await getRepository(GalleryEntity).insert(Gallery);
    return  Gallery;
}

let user:any;

describe('Gallery Service functions',  ()=>{


 beforeAll(async() => {
    return await connection;
    });

 beforeEach(async()=>{
     user = await createNewUser();
 });

    afterEach(async() => 
    {
        await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        await getManager().query(`TRUNCATE TABLE gallery RESTART IDENTITY CASCADE`);
    });

    afterAll(async()=>{
        (await connection).close();
    })


    it('it creates a new gallery', async () =>
    {
        
        const galleryData:any = {
            title:"this is the title",
            image:'dddddd.png',
            user: await user
           };
         
         const Gallery:GalleryEntity = galleryData as GalleryEntity;
         const responseCreate:any  = await galleryService.create(Gallery);
         expect(responseCreate?.title).toBe(galleryData?.title);
    });

  it('updates gallery', async()=>{
   
   await createNewGallery(user);

    const dataItem:any = 
    { 
        title:'update title',
      image:'testcontent.png'
     };
    
     const GalleryUpdate:GalleryEntity = dataItem as GalleryEntity;
 
     const updateContent:any = await galleryService.update(GalleryUpdate,1);
     expect(updateContent?.affected).toBe(1);
   
  });

  it('deletes single gallery',async()=>
  {
    await createNewGallery(user);
    const deletedGallery = await galleryService.delete(1);
    expect(deletedGallery?.affected).toBe(1);
  });
   
  it('get single gallery', async()=>
  {
    await createNewGallery(user);
  const data =  await galleryService.getSingleGallery(1);
   expect(data?.id).toBe(1);

  });

  it('count gallery items', async()=>
  {
      await createNewGallery(user);
      const data = await galleryService.countGalleryItems(1);
      expect(data).toBe(1);
  })

  it('paginate data', async() =>
  {
      await createNewGallery(user);
      const data:any = await galleryService.index(1,10,1);
     expect(data.data.length).toBe(1);
  })

})


