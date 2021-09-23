import fetchIntercept,{FetchInterceptorResponse} from 'fetch-intercept';
import Cookies from 'js-cookie'
import { Store } from 'redux';
import { JWT_TOKEN_KEY } from '../constants';





export const HttpInterceptor = (store:Store) =>fetchIntercept.register({
    request: function (url:string, config:any):Promise<any[]> |any[] 
    {     
        return [url, config];
    },

    response: function (response:FetchInterceptorResponse):FetchInterceptorResponse 
    {
        redirectIfTokenExpires(response);

        return response;
    },
   
});


export const redirectIfTokenExpires = (response:any) =>
{
   if(response.status==401)
        {
            Cookies.remove(JWT_TOKEN_KEY);
            window.location.href="/#/auth/lologin";  
        }
}