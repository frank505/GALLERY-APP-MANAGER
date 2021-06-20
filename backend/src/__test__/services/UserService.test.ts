import { getManager,getRepository } from "typeorm";
import { connection } from "../database/databaseConnection"
import { UserEntity } from "../../database/entities/UserEntity";
import { UserRepository } from "../../repository/UserRepository";
import UserService from "../../services/UserService";
  



const user = new UserService();

const dataToSave:any = {
    name:"desmond",
   email:"akpufranklin3333333@gmail.com",
   password:"srtewasdfghjytr234ES345rffr"
  };

const User:UserEntity = dataToSave as UserEntity;


describe('User Service test', () => 
{
 

    beforeAll(async() => {
    return await connection;
    });


    afterAll(async() => 
    {
        await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        (await connection).close();
    });

  
   

it("create a new user", async () => {
    
          
      const userInsert = await user.createUser(User);
      expect(userInsert?.name).toBe('desmond');

});
    

it('login user service' , async() =>
{
    const getUserLogin = await user.getSingleUserDetails(dataToSave?.email);
    expect(getUserLogin?.name).toBe('desmond');
});


it('get single user details', async () =>
{
  const getSingleUserDetailsFromId = await user.getSingleUserDetailsFromId(1);
  expect(getSingleUserDetailsFromId?.name).toBe('desmond');
});

it('check if email exist',async()=>
{
    const getEmailExistCount = await user.checkEmailAlreadyExist(dataToSave?.email);
    expect(getEmailExistCount).toBe(1);
})
    
  });




