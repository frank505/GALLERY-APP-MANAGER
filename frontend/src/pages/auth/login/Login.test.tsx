import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Login from './Login';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText } from "@testing-library/react";
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderComponent = () =>
{
  const Comp =  render(
    <Provider store={store} >
      <Login/>
    </Provider>    
    );



    return Comp;
}


const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const loginEmailFieldWrapper = await findByTestId('login-email-form');
    const loginEmailField:any = loginEmailFieldWrapper.querySelector('#email');   
    const loginPasswordWrapper = await findByTestId('login-password-form');
    const loginPasswordField:any = loginPasswordWrapper.querySelector('#password');
    const loginErrPasswordResponse = await findByTestId('login-password-validation-response');
    const loginErrEmailResponse = await findByTestId('login-email-validation-response');
    const formLogin = await findByTestId('form-login-container');
   const  submitButton = await findByTestId('btn-submit-user-form');
   const hideAndShowPasswordButton = await findByTestId('hide-and-show-button');
    return {
        loginEmailField,
        loginEmailFieldWrapper,
        loginPasswordWrapper,
        loginErrPasswordResponse,
        loginErrEmailResponse,
        formLogin,
        loginPasswordField,
        submitButton,
        hideAndShowPasswordButton
    }
}


describe('Login component', () => {
    
    it('renders component properly',()=>
    {
      renderComponent();
    });

    it('validates input on formchange',async()=>
    {
     
       const {loginEmailField,
         loginErrEmailResponse,
         loginPasswordField, loginErrPasswordResponse } = await setup();
         userEvent.type(loginEmailField,'ddd');
       await waitFor(()=>{
        expect(loginErrEmailResponse.innerHTML).toBe("<div>Invalid email address</div>") 
       });
         userEvent.type(loginEmailField,'akpufranklin2@gmail.com');
         userEvent.type(loginPasswordField,'sss');
         await waitFor(()=>{
            expect(loginErrEmailResponse.innerHTML).toBe("");
            expect(loginErrPasswordResponse.innerHTML).toBe(''); 
         })
     

    });

    it('validates form input',async()=>
    {
      
            const {formLogin,loginErrPasswordResponse,
                loginErrEmailResponse,
                 submitButton,
                loginPasswordField,
                loginEmailField
                } = await setup();
                fireEvent.submit(formLogin); 
            await waitFor(()=>{
                expect(loginErrEmailResponse.innerHTML).toBe("<div>Invalid email address</div>") 
                expect(loginErrPasswordResponse.innerHTML).toBe("<div>Password Field is Required</div>") 
            });
           userEvent.type(loginEmailField,'akpufranklin2@gmail.com');
           userEvent.type(loginPasswordField,'sss');

          fireEvent.submit(formLogin);

         await waitFor(()=>{
            expect(loginErrEmailResponse.innerHTML).toBe("");
            expect(loginErrPasswordResponse.innerHTML).toBe(''); 
         }) 
      
    });


    it('toggles password field to text',async()=>
    {
       const {hideAndShowPasswordButton,loginPasswordField} = await setup();
       fireEvent.click(hideAndShowPasswordButton);
      await waitFor(()=>{
         expect(loginPasswordField.type).toBe('text');
       })

    });   

})
