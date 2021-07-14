import * as Repository from "typeorm";
import {UserEntity} from "../../database/entities/UserEntity";
import UserService from "../../services/UserService";
  


jest.mock('typeorm', () => {

  const typeOrm = {
    getRepository:jest.fn().mockImplementation(()=>{
      return{
        save:jest.fn(),
        findOneOrFail:jest.fn(),
        count:jest.fn()
      }
    }),
    ObjectType(){}, 
    Entity(){},
    InputType(){},
    Index(){},
    PrimaryGeneratedColumn(){},
    Column(){},
    CreateDateColumn(){},
    UpdateDateColumn(){},
    OneToMany(){},
    ManyToOne(){},
  };
  return typeOrm;
});


describe('jest describe', () => {

    afterEach(()=>{
      jest.restoreAllMocks();
    })

    it('createUser', async() => {
      const user = new UserService;
      const newUser:UserEntity  = {};
      const data:any = {}
      await user.createUser(newUser);
      expect(Repository.getRepository).toHaveBeenCalled();
    });
  
   it('getSingleUserDetails',async()=>{
     const user = new UserService;
     const email:string = 'ddd@gmail.com'
     await user.getSingleUserDetails(email);
     expect(Repository.getRepository).toHaveBeenCalled();
   });

   it(' getSingleUserDetailsFromId',async()=>{
    const user = new UserService;
    const id:number = 1;
    await user.getSingleUserDetailsFromId(id);
    expect(Repository.getRepository).toHaveBeenCalled();
   })


   it('checkEmailAlreadyExist',async()=>{
    const user = new UserService;
    const email:string = 'dddd';
    await user.checkEmailAlreadyExist(email);
    expect(Repository.getRepository).toHaveBeenCalled();
   })
   


  });


   


