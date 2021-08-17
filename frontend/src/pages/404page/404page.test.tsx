import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText } from "@testing-library/react";
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './404page';





const renderComponent = () =>
{
  const Comp =  render(
    <Provider store={store} >
    <PageNotFound/>
    </Provider>    
    );



    return Comp;
}


describe('page not found component', () => {
    
    it('renders component properly',()=>
    {
        renderComponent();
    });

})
