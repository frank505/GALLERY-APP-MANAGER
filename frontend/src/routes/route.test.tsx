import React from "react";
import { render, fireEvent, waitForElement, waitFor } from "@testing-library/react";
import Routes from './route';
import { Provider } from "react-redux";
import {store} from '../store/store'
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';




const mockHistoryPush = jest.fn();

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
    
    test('renders Route component as expected',()=>{
      renderRoutesComponent();
    });

    test('renders component correctly',async()=>
    {
        const tree = renderer
        .create(<Routes/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    })

})
