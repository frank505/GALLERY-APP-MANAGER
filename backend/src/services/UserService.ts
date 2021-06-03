import { getConnection, getRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { UserEntity } from "../database/entities/UserEntity";
import { UserRepository } from "../repository/UserRepository";






export default class UserService
{

    

    public createUser = async(User: UserEntity)=>
    {
        const newUser = await (await connection()).
        getCustomRepository(UserRepository).save(User);
        return newUser;
    }

    public loginUser = async(User:UserEntity)=>
    {
      
    }


    public checkEmailAlreadyExist = async (email:string):Promise<Number> =>
    {
      const countValue = await (await connection()).
      getCustomRepository(UserRepository).count({
        where:
        [
         {email:email}
        ]
      });
      return Number(countValue);
    }

    

}