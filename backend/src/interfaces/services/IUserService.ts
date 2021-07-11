import { UserEntity } from "../../database/entities/UserEntity";

export interface IUserService
{
  createUser(User:UserEntity): Promise<UserEntity>
  getSingleUserDetails(email:string):Promise<UserEntity>
  getSingleUserDetailsFromId(id:number):Promise<UserEntity>
  checkEmailAlreadyExist(email:string):Promise<Number>
}