import * as GalleryActionTypes from '../actiontypes/GalleryActionTypes';
import { AnyAction } from "redux";
import { GalleryReducer,initState } from "./GalleryReducer";





describe('gallery reducer', () => {

    it('should return the initial state', () => {
     let actions:AnyAction = {
         type: GalleryActionTypes.CLEAR_GALLERY_LIST,
        }  
      expect(GalleryReducer(initState, actions)).toEqual({galleryList:""});

    });

    it('gallery list is loading', () =>
    {
        expect(GalleryReducer([],
            {
                type:GalleryActionTypes.GALLERY_LIST_LOADING
            }
            )).toEqual({
                galleryList:'loading'
            })
    })


    it('gallery list success', () =>
    {
        expect(GalleryReducer([],
            {
                type:GalleryActionTypes.GALLERY_LIST_SUCCESS
            }
            )).toEqual({
                galleryList:[]
            })
    })
    
    it('gallery list error', () =>
    {
        expect(GalleryReducer([],
            {
                type:GalleryActionTypes.GALLERY_LIST_ERROR
            }
            )).toEqual({
                galleryList:[]
            })
    })

});