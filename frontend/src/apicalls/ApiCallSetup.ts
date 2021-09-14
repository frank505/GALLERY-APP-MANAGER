import Cookies, { CookieAttributes } from "js-cookie";
import { JWT_TOKEN_KEY } from "../constants";


export const baseUrl:string = "http://localhost:3000/";


export const getData =  async (addedUrl:string):Promise<JSON> => 
{
    const token:string|null|undefined = await Cookies.get(JWT_TOKEN_KEY);
    let requestOptions:RequestInit  = await getRequestOptions(token);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 

export const getRequestOptions = async(token:string|null|undefined):Promise<RequestInit> =>
{
    let requestOptions:RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token==null || token==''? '':'Bearer ' + token,
        'Content-type': 'application/json',
      },
    };

    return requestOptions;
  };


  export const deleteData =  async (addedUrl:string):Promise<JSON> => 
{
    const token:string|null|undefined = await Cookies.get(JWT_TOKEN_KEY);
    let requestOptions:RequestInit = await deleteRequestOptions(token);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 

export const deleteRequestOptions = async (token:string|null|undefined):Promise<RequestInit> =>
{
    let requestOptions:RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: token==null || token==''? '':'Bearer ' + token,
        'Content-type': 'application/json',
      },
    };

    return requestOptions;
  };


  export const postOrPatchRequestOptions = async (token:string|null|undefined,
    item:any,method:string):Promise<RequestInit> =>
  {
    let requestOptions:RequestInit = {
        method:method,
        headers:{
            Authorization:token==null || token==''?'':'Bearer '+token,
            'Content-type':'application/json'
        },
        body:JSON.stringify(item)
    }

    return requestOptions;
  }


  export const postOrPatchData =  async (addedUrl:string,
    item:any,method:string):Promise<JSON> => 
{
    const token:string|null|undefined = await Cookies.get(JWT_TOKEN_KEY);
    let requestOptions:RequestInit = await postOrPatchRequestOptions(token,item,method);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 



export const postOrPatchDataWithFormData = async (item:any, addedUrl:string, 
    method:string ):Promise<JSON> => {
    const token:string|null|undefined = await Cookies.get(JWT_TOKEN_KEY);

    const requestOptions:RequestInit = await postOrPatchRequestOptionsWithFormData(
        token,
        item,
       method,
    );

    return fetch(
        baseUrl + '' + addedUrl,
        requestOptions,
    ).then((response:Response) => response.json());
};


export const postOrPatchRequestOptionsWithFormData = async(token:string|null|undefined, 
    item:any, method:string):
Promise<RequestInit> => {
    let requestOptions:RequestInit = 
    {
        method: method,
        headers: {
            Authorization:token==null || token==''?'':'Bearer '+token,
        },

        body: item
    };

    return requestOptions;
};


 