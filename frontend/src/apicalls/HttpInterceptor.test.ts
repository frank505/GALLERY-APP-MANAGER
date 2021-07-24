import  { HttpInterceptor } from './HttpInterceptor';
import fetchIntercept, { FetchInterceptor } from 'fetch-intercept';
import {store} from '../store/store';
import Cookies from 'js-cookie';




jest.mock('../store/store');
jest.mock('js-cookie');

describe('http interceptor is defined', () => {
    
    it('called fetch intercept register',()=>
    {
     jest.spyOn(fetchIntercept,'register');
      HttpInterceptor(store);
      expect(fetchIntercept.register).toHaveBeenCalled();
      expect(fetchIntercept.register).toHaveBeenCalledTimes(1);  
    
    });

    
})




