import React from "react";
import { render, fireEvent, waitFor,screen} from "@testing-library/react";
import Routes from './route';
import { Provider } from "react-redux";
import {store} from '../store/store'
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import * as ReactRedux from 'react-redux';
import Cookies from "js-cookie";



const mockHistoryPush = jest.fn();

const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch'); 
const useSelectorSpy = jest.spyOn(ReactRedux,'useSelector');

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderRoutesComponent = () =>
{
  const Comp =  render(
    <Provider store={store}>
         <MemoryRouter initialEntries={['/test']} initialIndex={0}>
         <Routes />
         </MemoryRouter>
    </Provider>    
    );

    return Comp;
}






describe('it should mock route', () => {
    
  afterEach(()=>{
    useDispatchSpy.mockClear();
    jest.resetAllMocks();
    useSelectorSpy.mockClear();
  })

    test('renders Route component as expected',async()=>{
      const mockDispatchFn = jest.fn()
      const mockSelectorFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);
      useSelectorSpy.mockReturnValue(mockSelectorFn);
      const cookieValue:any = 'dd';
      jest.spyOn(Cookies,'get').mockImplementationOnce(()=> cookieValue);

      renderRoutesComponent();

      await waitFor(()=>{
        expect(mockDispatchFn).toHaveBeenCalled();
        expect(mockDispatchFn).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Mini-App-Gallery'));
     })
    });

  

  

})
