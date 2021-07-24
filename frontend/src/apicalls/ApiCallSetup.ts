export const baseUrl:string = "http://localhost:3000/api/";

const storageType:any = localStorage;

export const getData =  async <T>(addedUrl:string, tokenId :string=''):Promise<T> => 
{
    const token:any = await storageType.getItem(tokenId);
    let requestOptions:any = getRequestOptions(token);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response) => response.json());
} 

export const getRequestOptions = async <T>(token:string|null):Promise<T> =>
{
    let requestOptions:any = {
      method: 'GET',
      headers: {
        Authorization: token==null || token==''? '':'Bearer ' + token,
        'Content-type': 'application/json',
      },
    };

    return requestOptions;
  };

  export const postOrPatchRequestOptions = async <T>(token:string|null,
    item:any,method:string):Promise<T> =>
  {
    let requestOptions:any = {
        method:method,
        headers:{
            Authorization:token==null || token==''?'':'Bearer '+token,
            'Content-type':'application/json'
        },
        body:JSON.stringify(item)
    }

    return requestOptions;
  }


  export const postOrPatchData =  async <T>(addedUrl:string,
    item:any,method:string,
    tokenId :string=''):Promise<T> => 
{
    const token:string|null = await storageType.getItem(tokenId);
    let requestOptions:any = postOrPatchRequestOptions(token,item,method);
    return fetch(
      baseUrl + '' + addedUrl,
      requestOptions,
    ).then((response) => response.json());
} 




 