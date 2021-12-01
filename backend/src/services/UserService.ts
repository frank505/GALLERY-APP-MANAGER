import {  getRepository } from "typeorm";
import  {UserEntity}  from "../database/entities/UserEntity";







export default class UserService 
{

    

     public async createUser(User: UserEntity):Promise<UserEntity>
    {
        const newUser =  await  getRepository(UserEntity).save(User);
        return newUser;
    }
   
    public  getSingleUserDetails = async (email:string):Promise<UserEntity> =>{
      return getRepository(UserEntity).findOneOrFail({
        where:
        [
          {email:email}
        ]
      });
    }

    public async getSingleUserDetailsFromId(id:number):Promise<UserEntity>
    {
      return getRepository(UserEntity).findOneOrFail({
        where:[
          {id:id}
        ]
      });
    }


    public async checkEmailAlreadyExist(email:string):Promise<Number>
    {
      const countValue =  await getRepository(UserEntity).count({
        where:
        [
         {email:email}
        ]
      });
      return Number(countValue);
    }

    

}



