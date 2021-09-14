import { AnyAction } from 'redux';
import * as AppBarActionTypes from '../actiontypes/AppBarActionTypes';
import * as GalleryActionTypes from '../actiontypes/GalleryActionTypes';

export const initState:Object = 
    {
    galleryList:''
    }
     


   export  const GalleryReducer = (state:Object=initState, action:AnyAction) =>
   {
        switch(action.type){
    
              case GalleryActionTypes.CLEAR_GALLERY_LIST:
                return {
                    ...state,
                    galleryList: '',
                  };

                  case GalleryActionTypes.GALLERY_LIST_LOADING:
                return {
                    ...state,
                    galleryList: 'loading',
                  };
               
                case GalleryActionTypes.GALLERY_LIST_SUCCESS:
                return {
                ...state,
                galleryList: action.res ? action.res: [],
                    };  
                case GalleryActionTypes.GALLERY_LIST_ERROR:
                return {
                ...state,
                galleryList: action.error ? action.error: [],
                     };    
                    
            
                default:
                    return state
    
        }
    }
    


