

export const baseUrl:string = "http://localhost:3000/";

const storageType:any = localStorage;

export const getData =  async (addedUrl:string, tokenId :string=''):Promise<JSON> => 
{
    const token:string|null = await storageType.getItem(tokenId);
    let requestOptions:RequestInit  = await getRequestOptions(token);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 

export const getRequestOptions = async(token:string|null):Promise<RequestInit> =>
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


  export const deleteData =  async (addedUrl:string, tokenId :string=''):Promise<JSON> => 
{
    const token:string|null = await storageType.getItem(tokenId);
    let requestOptions:RequestInit = await deleteRequestOptions(token);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 

export const deleteRequestOptions = async <T>(token:string|null):Promise<RequestInit> =>
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


  export const postOrPatchRequestOptions = async (token:string|null,
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
    item:any,method:string,
    tokenId :string=''):Promise<JSON> => 
{
    const token:string|null = await storageType.getItem(tokenId);
    let requestOptions:RequestInit = await postOrPatchRequestOptions(token,item,method);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response:Response) => response.json());
} 



export const postDataWithFormData = async (item:any, addedUrl:string, 
    method:string, tokenId:string = ''):Promise<JSON> => {
    const token:string|null = await localStorage.getItem(tokenId);

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


export const postOrPatchRequestOptionsWithFormData = async(token:string|null, 
    item:any, method:string):
Promise<RequestInit> => {
    let requestOptions:RequestInit = {
        method: method,
        headers: {
            Authorization:token==null || token==''?'':'Bearer '+token,
        },

        body: JSON.stringify(item)
    };

    return requestOptions;
};


 