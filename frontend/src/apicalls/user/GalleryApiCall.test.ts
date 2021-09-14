import { baseUrl } from "../ApiCallSetup";
import { CreateGalleryApiCall, GetGalleryApiCall } from "./GalleryApiCall";


describe('GalleryApiCall.ts', () => 
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


    it('calls GalleryApiCalltest', async()=>
    {
     let mockFetched =  (global as any).fetch;  
    let page:number = 10;
     await GetGalleryApiCall(page);
     expect(mockFetched).toHaveBeenCalledTimes(1);
    });

   
    
});