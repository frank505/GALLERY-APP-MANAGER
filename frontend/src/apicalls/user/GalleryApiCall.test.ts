import { baseUrl } from "../ApiCallSetup";
import { CreateGalleryApiCall } from "./GalleryApiCall";


describe('AuthApiCalls.ts', () => 
{

    beforeEach(() => {
        (global as any).fetch.resetMocks();
      });
 
    it('calls CreateGalleryApiCalls', async()=>
    {
     let mockFetched =  (global as any).fetch;
     let credentials:any = {};
     await CreateGalleryApiCall(credentials);
     expect(mockFetched).toHaveBeenCalledTimes(1);   
    });

   
    
});