import { deleteData, getData, getRequestOptions,
     postDataWithFormData,
     postOrPatchData,
     postOrPatchRequestOptions, 
     postOrPatchRequestOptionsWithFormData } from "./ApiCallSetup";



describe('ApiCallSetups', () => {
 
    beforeEach(() => {
        (global as any).fetch.resetMocks();
      });

    it('is a get request option', async ()=>
    {
       let requestOpt:RequestInit = await getRequestOptions(null);
       expect(requestOpt.method).toBe('GET');
    });

    it('is a post or patch request option', async()=>
    {
      let requestOpt:RequestInit = await postOrPatchRequestOptions(null,{},'POST');
      expect(requestOpt.method).toBe('POST');
    })

    it('its a post or patch request option for formndata', async() =>{
        let requestOpt:RequestInit = await postOrPatchRequestOptionsWithFormData(null,{},'PATCH');
        expect(requestOpt.method).toBe('PATCH');
    });
   
    it('calls getdata function',async()=>
    {
      let mockFetched =  (global as any).fetch;
       await getData('/url');
       expect(mockFetched).toHaveBeenCalledTimes(1);  
    })

    it('calls post or patch data', async()=>
    {
        let mockFetched =  (global as any).fetch;
        await postOrPatchData('/',{},'PATCH');
        expect(mockFetched).toHaveBeenCalledTimes(1);  
    })

    it('calls post or patch data with formdata', async()=>
    {
        let mockFetched =  (global as any).fetch;
        await postDataWithFormData({},'/','PATCH','');
        expect(mockFetched).toHaveBeenCalledTimes(1);  
    });

    it('calls deleteData', async()=>
    {
        let mockFetched =  (global as any).fetch;
        await deleteData('/','');
        expect(mockFetched).toHaveBeenCalledTimes(1);  
    });


});