import { validateCreateGallery } from "../../../../middleware/validators/CreateGalleryValidator";




describe('create ', () => 
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
        
        expect(validateCreateGallery(requestBody,files)).toHaveProperty('errorStatus',true);
  
    });
  

  });