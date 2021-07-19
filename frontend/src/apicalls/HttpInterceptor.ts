import fetchIntercept,{FetchInterceptorResponse} from 'fetch-intercept';
import Cookies from 'js-cookie'
import { Store } from 'redux';
import { JWT_TOKEN_KEY } from '../constants';





export const HttpInterceptor = (store:Store) =>fetchIntercept.register({
    request: function (url:string, config:any):Promise<any[]> |any[] {
        
        return [url, config];
    },

    requestError: function (error:any):Promise<any> {

        console.log(error);
        return Promise.reject(error);
    },

    response: function (response:FetchInterceptorResponse):FetchInterceptorResponse {
        // Modify the reponse object
        console.log(response.status);
        if(response.status==401)
        {
            Cookies.remove(JWT_TOKEN_KEY);
            window.location.href="/#/login";
          
        }
        return response;
    },

    responseError: function (error:any):Promise<any> {
        console.log('error here oooo take note');
        if(error.status==undefined || error.status==401)
        {
        //    store.dispatch({type:SHOW_MODAL_LOGIN});
        }
        // Handle an fetch error
        return Promise.reject(error);
    }
});