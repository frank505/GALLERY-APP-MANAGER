import { getConnection, getRepository,getCustomRepository } from "typeorm";
import { connection } from "../database/databaseConnection";
import { UserEntity } from "../database/entities/UserEntity";
import { UserRepository } from "../repository/UserRepository";






export default class UserService
{

    

    public createUser = async(User: UserEntity)=>
    {
        const newUser =  await  getCustomRepository(UserRepository).save(User);
        return newUser;
    }

    public getSingleUserDetails = async(email:string)=>
    {
      return getCustomRepository(UserRepository).findOneOrFail({
        where:
        [
          {email:email}
        ]
      });
    }


    public checkEmailAlreadyExist = async (email:string):Promise<Number> =>
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