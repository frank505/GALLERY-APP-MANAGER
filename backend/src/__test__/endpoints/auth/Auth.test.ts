import request from 'supertest';
import Server from '../../../server';
import {connection} from '../../database/databaseConnection'
import { getManager,getRepository } from "typeorm";
import { UserEntity } from '../../../database/entities/UserEntity';



const appInstance = new Server();
const app = appInstance.appInstance();

jest.setTimeout(10000)


const dataToSave:any = {
    name:"desmond",
   email:"akpufranklin2@gmail.com",
   password:"password"
  };

const createNewUser = async(dataToSave:any) =>
{  
    
    
    const User:UserEntity = dataToSave as UserEntity;
   await getRepository(UserEntity).insert(dataToSave);
   return User;
}


describe('auth routes', ()=>{

    beforeAll(async() => {
        return await connection;
        });
    
       beforeEach(async()=>{
         return  await createNewUser(dataToSave);
       }) 
    
        afterAll(async() => 
        {
            await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        });
    
        afterAll(async()=>{
            (await connection).close();
        })


        it('logs in successful', async()=>
        {
           await request(app).
           post('/auth/login'). 
           send(dataToSave).
           expect(200).
          then((res) => {
            //   console.log(res);
         expect(res.body).toHaveProperty('success',true);
        });
        
        })

it('registration was successful', async()=>
{
    const dataToSave:any = {
        name:"desmond",
       email:"akpufranklin2432@gmail.com",
       password:"password"
      };

     await request(app).
      post('/auth/register').  
      send(dataToSave).
      expect(201).
     then((res) => {
    expect(res.body).toHaveProperty('success',true);
   });

});



});