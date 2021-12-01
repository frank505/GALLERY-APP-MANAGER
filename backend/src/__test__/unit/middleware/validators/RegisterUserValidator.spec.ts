import { CreateUserValidationInterface } from "../../../../interfaces/validation/CreateUserInterface";
import { RegisterUserValidation } from "../../../../middleware/validators/RegisterUserValidator";


describe('Login User Validator', () => 
{
    

    it('validate user details', async () => 
    {
        let requestBody:CreateUserValidationInterface = {
            name:'',
            email:'',
            password:''
        }
        
        expect(RegisterUserValidation(requestBody)).toHaveProperty('errorStatus',true);
  
    });
  

  });