import  { HttpInterceptor } from '../../apicalls/HttpInterceptor';
import fetchIntercept, { FetchInterceptor } from 'fetch-intercept';
import store from '../../store/Index.store';
import Cookies from 'js-cookie';



jest.mock('../../store/Index.store');
jest.mock('js-cookie');

describe('http interceptor is defined', () => {
    
    it('called fetch intercept register',()=>
    {
     jest.spyOn(fetchIntercept,'register');
      HttpInterceptor(store);
      expect(fetchIntercept.register).toHaveBeenCalled();
      expect(fetchIntercept.register).toHaveBeenCalledTimes(1);  
    
    })
})




