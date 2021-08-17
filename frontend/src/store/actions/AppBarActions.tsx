import { AnyAction, Dispatch } from "redux";
import * as AppBarActionTypes from '../actiontypes/AppBarActionTypes';

export const AppBarHideAction = ():any =>
{
    return (dispatch:Dispatch):void  =>
   {
       dispatch({type: AppBarActionTypes.HIDE_APP_BAR});
   }
}

export const AppBarShowAction = ():any =>
{
    return (dispatch:Dispatch):void =>
   {
      dispatch({type: AppBarActionTypes.SHOW_APP_BAR});
   }
}