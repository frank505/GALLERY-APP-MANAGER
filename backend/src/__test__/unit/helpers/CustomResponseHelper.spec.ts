import CustomResponseHelper from "../../../helpers/CustomResponseHelper";
import * as mocks from 'node-mocks-http';




const req = mocks.createRequest();
const res = mocks.createResponse();

describe('Custom Response Helper', () => 
{
    

    it('should return custom http response function', async () => 
    {
       const customReq = new CustomResponseHelper();
       const customResponseData  = customReq.setHttpResponse(200,res,true,'');
       expect(customResponseData.statusCode).toEqual(200);
  
    });
  
    
    
  });