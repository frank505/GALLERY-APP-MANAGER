import {CombinedState, combineReducers, Reducer} from 'redux'
import { store } from '../store';
import { AppBarReducer } from './AppBarReducer';
import { GalleryReducer } from './GalleryReducer';






export const RootReducer:CombinedState<Reducer> = combineReducers({
    appBar:AppBarReducer,
    gallery:GalleryReducer
});
  
 



export type RootState = ReturnType<typeof RootReducer>