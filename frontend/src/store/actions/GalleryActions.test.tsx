import * as GalleryActionTypes from '../actiontypes/GalleryActionTypes';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { ClearGalleryListAction, GetGalleryListAction } from './GalleryActions';
import * as GalleryActions from './GalleryActions';
import { AnyAction } from 'redux';


const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

it('clear gallery list', async() => 
{
  

    const expectedActions =  [
        { type: GalleryActionTypes.CLEAR_GALLERY_LIST  },
      ]

      const store = mockStore({ galleryList: '' })
     
           store.dispatch(ClearGalleryListAction())
        expect(store.getActions()).toEqual(expectedActions);
   
   
  });   


  it('get gallery list ', async() => 
{
   
    const res:any = {galleryList: [] };

    const expectedActions:any =  
       [ { type: GalleryActionTypes.GALLERY_LIST_SUCCESS , res } ]
         
      const store = mockStore({ galleryList: [] })
      
        jest.spyOn(GalleryActions,'GetGalleryListAction').mockReturnValue(
         store.dispatch({ type: GalleryActionTypes.GALLERY_LIST_SUCCESS , res})
        );
        
        expect(store.getActions()).toEqual(expectedActions);
        expect(store.getState()).toEqual(res);
  });  

