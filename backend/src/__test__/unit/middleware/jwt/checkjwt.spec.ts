import { checkJwt } from './../../../../middleware/jwt/checkjwt';
import * as mocks from 'node-mocks-http';
import express ,{Request,Response} from 'express';




const res = mocks.createResponse();
const req = mocks.createRequest();
const next = jest.fn() as unknown as express.NextFunction;

describe('Custom Response Helper', () => 
{
    

    it('should return custom http response function', async () => 
    {
        const header = req.headers;
         header.authorization = 'Bearer sfghgfdsasdfgfdsa';
       const jwtVerify = checkJwt(req,res,next);
        expect(jwtVerify?.statusCode).toBe(401);  
       expect(next).not.toHaveBeenCalled();
    });
  
    
    
  });