import { getManager } from "typeorm";
import { connection } from "../database/databaseConnection"
import { UserEntity } from "../../database/entities/UserEntity";
import { UserRepository } from "../../repository/UserRepository";
import UserService from "../../services/UserService";




const user = new UserService();


describe('User Service test', () => 
{
 

    beforeEach(async() => {
    return await connection;
    });


    afterAll(async() => 
    {
        await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        (await connection).close();
    });

  
  

it("create a new user", async () => {
    
        const dataToSave:any = {
            name:"desmond",
           email:"akpufranklin3333333@gmail.com",
           password:"srtewasdfghjytr234ES345rffr"
          };
   
      const User:UserEntity = dataToSave as UserEntity;
      
      const userInsert = await user.createUser(User);
      expect(userInsert?.name).toBe('desmond');

});
    

it('login user service' , async() =>
{
   
});

    
  });




