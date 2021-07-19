import store  from '../../store/Index.store'
import * as redux from 'redux';
import thunk from 'redux-thunk';



jest.mock('redux-thunk');
jest.mock('redux-thunk');
jest.mock('../../store/Index.store')

describe('test for our store', () => {

   it('calls our store', ()=>
   {
    let valueMock:any = {};
    jest.spyOn(redux,'applyMiddleware').mockImplementation(()=>valueMock);
    jest.spyOn(redux,'createStore').mockImplementationOnce(()=>valueMock);
    store.getState();
    expect(redux.createStore).toHaveBeenCalled();
    expect(redux.applyMiddleware).toHaveBeenCalled(); 
   }) 


})
