import { createStore, Store } from "redux";
import {initState as AuthReducer} from "./AuthReducer";
import RootReducer from "./RootReducer";


describe('Root Reducer Suite', () => {

    it('loaded correctly', () => {

      let store:Store = createStore(RootReducer)
      expect(store.getState().auth).toEqual(AuthReducer);

    });


  });


