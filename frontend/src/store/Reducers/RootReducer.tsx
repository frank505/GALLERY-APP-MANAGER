import {CombinedState, combineReducers} from 'redux'
import { store } from '../store';
import { AppBarReducer } from './AppBarReducer';






export const RootReducer:CombinedState<any> = combineReducers({
    appBar:AppBarReducer
});
  
 



export type RootState = ReturnType<typeof RootReducer>