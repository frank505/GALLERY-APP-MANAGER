import { AnyAction, Dispatch } from "redux";
import { GetGalleryApiCall } from "../../apicalls/user/GalleryApiCall";
import * as GalleryActionTypes from '../actiontypes/GalleryActionTypes';

export const ClearGalleryListAction = ():any =>
{
    return (dispatch:Dispatch):void  =>
   {
       dispatch({type: GalleryActionTypes.CLEAR_GALLERY_LIST});
   }
}


export const GetGalleryListAction = (page:number):any => 
{

    return (dispatch:Dispatch):any => 
    {
     
        dispatch({type: GalleryActionTypes.GALLERY_LIST_LOADING});

     return GetGalleryApiCall(page).then((res:any)=>
      {
        console.log(res);
        if(res?.hasOwnProperty('success') && res?.success==true)
        {
         dispatch({type:GalleryActionTypes.GALLERY_LIST_SUCCESS,res});   
        }else
        {
         dispatch({type:GalleryActionTypes.GALLERY_LIST_ERROR,error:res}); 
        }

      });  
   
    };
    
  };