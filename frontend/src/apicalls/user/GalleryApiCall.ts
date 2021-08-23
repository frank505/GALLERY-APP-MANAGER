import {  postOrPatchDataWithFormData } from "../ApiCallSetup"

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



