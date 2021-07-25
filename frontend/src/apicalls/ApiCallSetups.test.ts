import { getRequestOptions } from "./ApiCallSetup";



describe('ApiCallSetups', () => {
 
    it('is a get request option', async ()=>
    {
       let responseOpt:RequestInit = await getRequestOptions(null);
       expect(responseOpt.method).toBe('GET');
    })

});