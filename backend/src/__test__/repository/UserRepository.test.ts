import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repository/UserRepository"


describe('Gallery Repository exists',  ()=>{

       it('user custom repository exist', async () =>
       {
          expect(UserRepository).toBeDefined();
       });
   
  
   })
   
   