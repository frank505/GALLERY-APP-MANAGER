import {  deleteData, getData, postOrPatchDataWithFormData } from "../ApiCallSetup"

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



export const deleteGalleryApiCall = async(id:number):Promise<JSON> =>
{
  const addedUrl:string = 'user/delete/'+id; 

 return deleteData(addedUrl).then((data:any)=>
 {
   return data;
 }).catch((error:any)=>{
   return error;
 })

}


export const editGalleryApiCall = async(id:string|Blob,credentials:FormData)=>
{
  const addedUrl:string = "user/update-gallery/"+id;

  return postOrPatchDataWithFormData(credentials,addedUrl,'PATCH').then((data:any)=>{
    return data;
  }).catch((error:any)=>{
    return error;
  });

}


