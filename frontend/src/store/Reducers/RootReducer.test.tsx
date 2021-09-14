import { createStore, Store } from "redux";
import {initState as AppBarReducer} from "./AppBarReducer";
import { initState as GalleryReducer } from "./GalleryReducer";
import {RootReducer} from "./RootReducer";


describe('Root Reducer Suite', () => {

    it('loaded correctly', () => {

      let store:Store = createStore(RootReducer)
      expect(store.getState().appBar).toEqual(AppBarReducer);
      expect(store.getState().gallery).toEqual(GalleryReducer);
    });


  });


