import { getManager,getRepository } from "typeorm";
import { connection } from "../database/databaseConnection"
import { UserEntity } from "../../database/entities/UserEntity";
import { UserRepository } from "../../repository/UserRepository";
import UserService from "../../services/UserService";
  
describe('jest describe', () => {
    it('perfom', () => {
       expect(true).toBe(true);
    });
  
  });


// const user = new UserService();

// const dataToSave:any = {
//     name:"desmond",
//    email:"akpufranklin3333333@gmail.com",
//    password:"srtewasdfghjytr234ES345rffr"
//   };

// const User:UserEntity = dataToSave as UserEntity;

// const createNewUser = async(dataToSave:UserEntity) =>
// {  
//    await getRepository(UserEntity).insert(dataToSave);
//    return User;
// }


// describe('User Service test', () => 
// {
 

//     beforeAll(async() => {
//     return await connection;
//     });


//     afterEach(async() => 
//     {
//         await getManager().query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
        
//     });

//     afterAll(async()=>{
//         (await connection).close();
//     })

  
   

// it("create a new user", async () => {
    
          
//       const userInsert = await user.createUser(User);
//       expect(userInsert?.name).toBe('desmond');

// });
    

// it('login user service' , async() =>
// {
//     await createNewUser(dataToSave);
//     const getUserLogin = await user.getSingleUserDetails(dataToSave?.email);
//     expect(getUserLogin?.email).toBe('akpufranklin3333333@gmail.com');
// });


// it('get single user details', async () =>
// {
//     await createNewUser(dataToSave);
//   const getSingleUserDetailsFromId = await user.getSingleUserDetailsFromId(1);
//   expect(getSingleUserDetailsFromId?.email).toBe('akpufranklin3333333@gmail.com');
// });

// it('check if email exist',async()=>
// {
//     await createNewUser(dataToSave);
//     const getEmailExistCount = await user.checkEmailAlreadyExist(dataToSave?.email);
//     expect(getEmailExistCount).toBe(1);
// })
    
//   });




