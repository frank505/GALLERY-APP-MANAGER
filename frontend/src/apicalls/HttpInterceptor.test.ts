import  { HttpInterceptor, redirectIfTokenExpires } from './HttpInterceptor';
import fetchIntercept, { FetchInterceptor, FetchInterceptorResponse } from 'fetch-intercept';
import {store} from '../store/store';
import Cookies from 'js-cookie';
import { waitFor } from '@testing-library/dom';




jest.mock('../store/store');
jest.mock('js-cookie');


const mockFetchedFunc = ():any =>
{
  const fakeResponse = Promise.resolve({});
  const mRes = { 
    json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)), 
    status:401 
  };
  let originFetch = jest.fn().mockResolvedValue(mRes as any);
  (global as any).fetch = originFetch;
  return originFetch;
}   

describe('http interceptor is defined', () => {
    
    it('called fetch intercept register', async()=>
    { 
     jest.spyOn(fetchIntercept,'register').mockImplementationOnce(
       ():any => {
        return {
          // request:jest.fn().mockImplementationOnce(
          //   ()=>[]
          //   ),
          // requestError:jest.fn().mockImplementationOnce(
          //   (error:any):Promise<any>=>Promise.reject(error)
          //   ),
          // response:jest.fn().mockImplementationOnce(
          //   (response):any=> response),
          // responseError:jest.fn().mockImplementationOnce(
          //   (error:any):Promise<any>=>Promise.reject(error)
          //   ),
        }
       }
     );

    jest.spyOn(fetchIntercept,'register')
      HttpInterceptor(store);
     
      expect(fetchIntercept.register).toHaveBeenCalled();
      expect(fetchIntercept.register).toHaveBeenCalledTimes(1);  
    
    });

  it('returns a 401 response', async()=>{
   
    jest.spyOn(Cookies,'remove').mockImplementationOnce(():any=>{}); 
    const response =  {status:401};
    redirectIfTokenExpires(response); 
   expect(Cookies.remove).toHaveBeenCalled();

  })  
    
})




