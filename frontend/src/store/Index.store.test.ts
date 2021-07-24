import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as redux from 'redux';
import * as storeItem from './store';


const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)


jest.mock('redux-thunk');


describe('test for our store', () => {

   it('renders correctly', ()=>
   {
    
   }) 


})
