import { getCustomRepository } from "typeorm";
import { UserEntity } from "../database/entities/UserEntity";
import { IUserService } from "../interfaces/services/IUserService";
import { UserRepository } from "../repository/UserRepository";






export default class UserService implements IUserService
{

    

     public async createUser(User: UserEntity):Promise<UserEntity>
    {
        const newUser =  await  getCustomRepository(UserRepository).save(User);
        return newUser;
    }
   
    public  getSingleUserDetails = async (email:string):Promise<UserEntity> =>{
      return getCustomRepository(UserRepository).findOneOrFail({
        where:
        [
          {email:email}
        ]
      });
    }

    public async getSingleUserDetailsFromId(id:number):Promise<UserEntity>
    {
      return getCustomRepository(UserRepository).findOneOrFail({
        where:[
          {id:id}
        ]
      });
    }


    public async checkEmailAlreadyExist(email:string):Promise<Number>
    {
      const countValue =  await getCustomRepository(UserRepository).count({
        where:
        [
         {email:email}
        ]
      });
      return Number(countValue);
    }

    

}