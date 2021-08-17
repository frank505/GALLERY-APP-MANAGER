import * as AppBarActionTypes from '../actiontypes/AppBarActionTypes';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { AppBarHideAction, AppBarShowAction } from './AppBarActions';


const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

it('show app bar', async() => 
{
  

    const expectedActions =  [
        { type: AppBarActionTypes.SHOW_APP_BAR  },
      ]

      const store = mockStore({ appBarVisibilityStatus: 'hide' })
     
           store.dispatch(AppBarShowAction())
        expect(store.getActions()).toEqual(expectedActions);
   
   
  });   


  it('hides app bar', async() => 
{
  

    const expectedActions =  [
        { type: AppBarActionTypes.HIDE_APP_BAR  },
      ]

      const store = mockStore({ appBarVisibilityStatus: 'show' })
     
           store.dispatch(AppBarHideAction());
        expect(store.getActions()).toEqual(expectedActions);
   
   
  });  

