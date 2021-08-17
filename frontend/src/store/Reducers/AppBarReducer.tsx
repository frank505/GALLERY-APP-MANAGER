import { AnyAction } from 'redux';
import * as AppBarActionTypes from '../actiontypes/AppBarActionTypes';

export const initState:Object = 
    {
    appBarVisibilityStatus: 'hide',
    }
     


   export  const AppBarReducer = (state:Object=initState, action:AnyAction) =>
   {
        switch(action.type){
    
              case AppBarActionTypes.HIDE_APP_BAR:
                return {
                    ...state,
                    appBarVisibilityStatus: 'hide',
                  };
                  case AppBarActionTypes.SHOW_APP_BAR:
                return {
                    ...state,
                    appBarVisibilityStatus: 'show',
                  };
            
                default:
                    return state
    
        }
    }
    


