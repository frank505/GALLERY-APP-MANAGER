import { postOrPatchData } from "../ApiCallSetup"

export const LoginApiCall = async(credentials:any):Promise<JSON> =>
{
   const addedUrl:string = 'auth/login'; 

 return postOrPatchData(addedUrl,credentials,'POST').then((data:any)=>
 {
   return data;
 }
  );

}



export const RegisterApiCall = async(credentials:any):Promise<JSON> =>
{
    const addedUrl:string = 'auth/register'; 

 return postOrPatchData(addedUrl,credentials,'POST').then((data:any)=>
 {
   return data;
 }
  );
} 