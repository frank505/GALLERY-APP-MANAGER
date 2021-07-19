import { createStore, applyMiddleware, StoreEnhancerStoreCreator, Store } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Reducers/RootReducer';
 import { HttpInterceptor } from '../apicalls/HttpInterceptor';

export const middlewares:Array<any> = [thunk];

export const createStoreWithMiddleware:StoreEnhancerStoreCreator<any> = applyMiddleware(...middlewares)(createStore)

const store:Store = createStoreWithMiddleware(RootReducer)

export default store;

 HttpInterceptor(store); 


  


