import { baseUrl } from "../ApiCallSetup";
import {
   CreateGalleryApiCall, 
   editGalleryApiCall,
  deleteGalleryApiCall, 
  GetGalleryApiCall 
} from "./GalleryApiCall";


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


    it('calls GalleryApiCalltest ', async()=>
    {
     let mockFetched =  (global as any).fetch;  
    let page:number = 10;
     await GetGalleryApiCall(page);
     expect(mockFetched).toHaveBeenCalledTimes(1);
    });

    it('delete GalleryApiCalltest', async()=>
    {
     let mockFetched =  (global as any).fetch;  
    let id:number = 1;
     await deleteGalleryApiCall(id);
     expect(mockFetched).toHaveBeenCalledTimes(1);
    });


    it('dit Gallery item', async()=>{
      let mockFetched =  (global as any).fetch;  
      let id:string|Blob = "1";
      let creadentials:any = {};
       await editGalleryApiCall(id,creadentials);
       expect(mockFetched).toHaveBeenCalledTimes(1);
    })
   
    
});