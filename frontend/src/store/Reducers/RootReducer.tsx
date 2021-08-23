import {CombinedState, combineReducers, Reducer} from 'redux'
import { store } from '../store';
import { AppBarReducer } from './AppBarReducer';






export const RootReducer:CombinedState<Reducer> = combineReducers({
    appBar:AppBarReducer
});
  
 



export type RootState = ReturnType<typeof RootReducer>