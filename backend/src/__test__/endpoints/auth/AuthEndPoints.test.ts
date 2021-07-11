import request from 'supertest';
import Server from '../../../server';
import {connection} from '../../database/databaseConnection'
import { getManager,getRepository } from "typeorm";
import { UserEntity } from '../../../database/entities/UserEntity';
import * as bcrypt from 'bcryptjs';



const appInstance = new Server();
const app = appInstance.appInstance();

jest.setTimeout(10000)

const dataToSave:any = {
    name:"desmond",
   email:"akpufranklin222@gmail.com",
   password: bcrypt.hashSync('password',8)//hash for password
  };

const User:UserEntity = dataToSave as UserEntity;

const createNewUser = async(dataToSave:UserEntity) =>
{  
   await getRepository(UserEntity).insert(dataToSave);
   return User;
}

describe('auth routes', ()=>{

    beforeAll(async() => {
        return await connection;
        });
    
    
        afterEach(async()=>{
            await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        })

        afterAll(async()=>{
            (await connection).close();
        })

it('registration was successful', async()=>
{
    const data:any = {
        name:"desmond",
       email:"akpufranklin2432@gmail.com",
       password:"password"
      };

     await request(app).
      post('/auth/register').  
      send(data).
      expect(200).
     then((res) => {
    expect(res.body).toHaveProperty('success',true);
   });

});

it('login successfully', async()=>
{
    await createNewUser(dataToSave);
    
 const data = {
    email:"akpufranklin222@gmail.com",
    password:"password"
 }

  await request(app).
  post('/auth/login').
  send(data).
  expect(201)
  .then((res)=>{
   expect(res.body).toHaveProperty('success',true);
  });

})



});