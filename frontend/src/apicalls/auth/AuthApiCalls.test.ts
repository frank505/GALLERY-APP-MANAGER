import { baseUrl } from "../ApiCallSetup";
import { LoginApiCall, RegisterApiCall } from "./AuthApiCalls";

const mockFetchedFunc = ():any =>
{
  const fakeResponse = Promise.resolve({});
  const mRes = { json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)) };
  let originFetch = jest.fn().mockResolvedValue(mRes as any);
  (global as any).fetch = originFetch;
  return originFetch;
}   



describe('AuthApiCalls.ts', () => 
{

 
    it('calls LoginApiCalls', async()=>
    {
    let mockFetched = mockFetchedFunc();
     let credentials:any = {};
     await LoginApiCall(credentials);
     expect(mockFetched).toHaveBeenCalledTimes(1);   
    });

    it('calls register function', async()=>
    {
      let mockFetched = mockFetchedFunc();
      let credentials:any = {};
      await RegisterApiCall(credentials);
      expect(mockFetched).toHaveBeenCalledTimes(1); 
      
    });

   
    
});