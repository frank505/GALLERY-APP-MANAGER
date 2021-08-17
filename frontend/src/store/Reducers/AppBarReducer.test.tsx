import { AppBarReducer, initState } from "./AppBarReducer";
import * as AppBarActionTypes from '../actiontypes/AppBarActionTypes';
import { AnyAction } from "redux";



describe('appbar reducer', () => {

    it('should return the initial state', () => {
     let actions:AnyAction = {
         type: AppBarActionTypes.HIDE_APP_BAR,
        }  
      expect(AppBarReducer(initState, actions)).toEqual({appBarVisibilityStatus:"hide"});

    });

    it('should show appbar', () =>
    {
        expect(AppBarReducer([],
            {
                type:AppBarActionTypes.SHOW_APP_BAR
            }
            )).toEqual({
                appBarVisibilityStatus:"show"
            })
    })


    it('should show hide appbar', () =>
    {
        expect(AppBarReducer([],
            {
                type:AppBarActionTypes.HIDE_APP_BAR
            }
            )).toEqual({
                appBarVisibilityStatus:"hide"
            })
    })
    

});