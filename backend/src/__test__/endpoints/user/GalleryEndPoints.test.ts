import 'reflect-metadata'
import request from 'supertest';
import Server from '../../../server';
import {connection} from '../../database/databaseConnection'
import { getManager,getRepository } from "typeorm";
import  {UserEntity}  from '../../../database/entities/UserEntity';
import { GalleryEntity } from '../../../database/entities/GalleryEntity';
import { generateJwtToken } from '../../../helpers/generateJwt';
import path from "path";
import fs from 'fs';
import faker from 'faker';


const appInstance = new Server();
const app = appInstance.appInstance();

jest.setTimeout(400000);

const dataToSave:any = 
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password:faker.random.alphaNumeric()
  };

const User:UserEntity = dataToSave as UserEntity;

const createNewUser = async() =>
{  
   const dataToSave:any = 
  {
    name: faker.name.findName(),
   email: faker.internet.email(),
   password:faker.random.alphaNumeric()
  };

const User:UserEntity = dataToSave as UserEntity;
   await getRepository(UserEntity).insert(dataToSave);
   return User;
}


const createNewGallery = async(user:any) =>
{
    const galleryData:any = {
        title: faker.lorem.sentence(10),
        image:'dddddd.png', 
        user: await user
       };
     
     const Gallery:GalleryEntity = galleryData as GalleryEntity;

   const dataGallery =  await getRepository(GalleryEntity).
   insert(Gallery);

   return dataGallery;
}

const deleteAllFiles = async() =>
{
 const dataToGet =  await getRepository(GalleryEntity).find();
  console.log(dataToGet);
 dataToGet.forEach((element,index) => {
   const imageName:string|undefined = element?.image; 
   console.log("this is the image to be deleted "+imageName)
  const pathToFile:string = path.join(__dirname,`../../../public/uploads/gallery/${imageName}`) 
  console.log(pathToFile);
  if (fs.existsSync(pathToFile)) 
  {
     fs.unlinkSync(pathToFile)
   }  
 });  
}

describe('gallery routes', ()=>{

   beforeAll(async() => {
      return await connection;
      });
  
  
      afterEach(async()=>{
         await deleteAllFiles();
        await getManager().query(`TRUNCATE TABLE gallery RESTART IDENTITY CASCADE`);
          await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
         
      })

      afterAll(async()=>{
          (await connection).close();
      })
    

it('create a new gallery', async()=>
{

    const data:any = {
       title:"this is the title",
      };
      let user = await createNewUser();
    const token = generateJwtToken(user);
    

     await request(app)
      .post('/user/create-gallery')
      .set({'Authorization':'bearer ' + token,
           'Accept':'multipart/form-data',
           'Content-type':'multipart/form-data'
      })
      .field('title', data.title)
      .attach('image',  path.join(__dirname, '../../testimage/test.jpg') ) 
      .expect(200)
     .then( async (res) => {
    expect(res.body).toHaveProperty('success',true);
   });
  
});


 it('updates gallery with file',async()=>{
   let user = await createNewUser();
     const token = generateJwtToken(user);
     const newGallery =  await createNewGallery(user);
     const id = newGallery.generatedMaps[0]?.id;
     const data:any = {
         title:"title item to update with file",
        };
     await request(app)
     .patch('/user/update-gallery/'+id)
     .set({'Authorization':'bearer ' + token,
           'Content-type':'multipart/form-data',
           'Accept':'multipart/form-data'
      })
     .field('title', data.title)
     .attach('image',  path.join(__dirname, '../../testimage/test.jpg') ) 
     .expect(200)
    .then(async(res) => {
   expect(res.body).toHaveProperty('success',true);
  });
 
 });

 
 it('list ur  gallery items',async()=>{
  
   let user = await createNewUser();
   const token = generateJwtToken(user);
   await createNewGallery(user);
   await request(app)
   .get('/user/list-gallery')
   .set({'Authorization':'bearer ' + token})
   .expect(200)
  .then((res) => {
 expect(res.body).toHaveProperty('success',true);
 
});


});



it('delete gallery',async()=>{
   let user = await createNewUser();
   const token = generateJwtToken(user);
   const newGallery =  await createNewGallery(user);
    console.log(newGallery.raw);
   let id = newGallery.generatedMaps[0]?.id;
   await request(app) 
   .delete(`/user/delete/${id}`)
   .set({'Authorization':'bearer ' + token})
   .expect(200)
  .then((res) => {
 expect(res.body).toHaveProperty('success',true);
 
});

});



})