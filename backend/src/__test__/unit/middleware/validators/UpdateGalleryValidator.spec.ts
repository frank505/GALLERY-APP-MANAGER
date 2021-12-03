import { UpdateGalleryRules } from "../../../../middleware/validators/UpdateGalleryValidator";


describe('Login User Validator', () => 
{
    

    it('validate create gallery', async () => 
    {
        let requestBody:any = {
            title:'',
        }
        let files:any = {
           image:{
               type:"image/png"
           }
        }
        
        expect(UpdateGalleryRules(requestBody,files)).toHaveProperty('errorStatus',true);
  
    });
  

  });