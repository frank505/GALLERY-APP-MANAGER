import {CombinedState, combineReducers} from 'redux'
import {AuthReducer} from './AuthReducer';






const RootReducer:CombinedState<any> = combineReducers({
    auth:AuthReducer,
});
  
 



export default RootReducer