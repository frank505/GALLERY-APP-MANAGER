import { deleteData, getData, getRequestOptions,
     postOrPatchDataWithFormData,
     postOrPatchData,
     postOrPatchRequestOptions, 
     postOrPatchRequestOptionsWithFormData,setTokenValue } from "./ApiCallSetup";
 import * as ApiCallSetUp from './ApiCallSetup';    


  const mockFetchedFunc = ():any =>
  {
    const fakeResponse = Promise.resolve({});
    const mRes = { json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)) };
    let originFetch = jest.fn().mockResolvedValue(mRes as any);
    (global as any).fetch = originFetch;
    return originFetch;
  }   

 






describe('ApiCallSetups', () => {
 

    it('test settokenvalue if it is null', ()=>{
        let res = setTokenValue(null);
        expect(res).toBe('');
    });

    it('is not null and not empty',()=>
    {
        let res = setTokenValue('ddd');
        expect(res).toBe('Bearer ddd');  
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
      let originFetch = mockFetchedFunc();
       await getData('/url');
       expect(originFetch).toHaveBeenCalledTimes(1);  

    })

    it('calls post or patch data', async()=>
    {
        let originFetch = mockFetchedFunc();
        await postOrPatchData('/',{},'PATCH');
        expect(originFetch).toHaveBeenCalledTimes(1);  
    })

    it('calls post or patch data with formdata', async()=>
    {
        let mockFetched =  mockFetchedFunc();
        await postOrPatchDataWithFormData({},'/','PATCH');
        expect(mockFetched).toHaveBeenCalledTimes(1);  
    });

    it('calls deleteData', async()=>
    {
        let mockFetched =  mockFetchedFunc();
        await deleteData('/');
        expect(mockFetched).toHaveBeenCalledTimes(1);  
    });


});