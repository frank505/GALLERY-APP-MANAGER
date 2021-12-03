import { getUserPayload } from './../../../../middleware/jwt/getUserPayload';
import * as mocks from 'node-mocks-http';
import express ,{Request,Response} from 'express';





const res = mocks.createResponse();
const req = mocks.createRequest();


describe('Custom Response Helper', () => 
{
    

    it('should return custom http response function', async () => 
    {
        const header = req.headers;  
         header.authorization = 'Bearer sfghgfdsasdfgfdsa';
       const getPayload = getUserPayload(req,res);
        expect(getPayload?.statusCode).toBe(401);  
        
    });
  
    
    
  });