import {  getData, postOrPatchDataWithFormData } from "../ApiCallSetup"

export const CreateGalleryApiCall = async(credentials:FormData):Promise<JSON> =>
{
   const addedUrl:string = 'user/create-gallery'; 

   return postOrPatchDataWithFormData(credentials,addedUrl,'POST').then((data:any)=>
   {
     return data;

   }).catch((error:any)=>
  {
      return error;
  });

}




export const GetGalleryApiCall = async(page:number):Promise<JSON> =>
{
  const addedUrl:string = 'user/list-gallery/?page='+page; 

  return getData(addedUrl).then((data:any)=>
  {
    return data;
  }).catch((error:any)=>
  {
    return error;
  });

}


