import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Login from './Login';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText } from "@testing-library/react";
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as AuthApi from '../../../apicalls/auth/AuthApiCalls';
import Cookies from 'js-cookie';
import * as Styles from '@material-ui/core/styles';
import * as usingCustomMaterialStyles from './styles';
import * as ReactRedux from 'react-redux';





const mockHistoryPush = jest.fn();
const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch'); 
     

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));




jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  // makeStyles: jest.fn().mockReturnValue(jest.fn()),
  makeStyles: jest.fn().mockImplementation(callback => {
      callback({ options: { common: { fonts: { sizes: {} } } } }); // this will execute the fn passed in which is missing the coverage
      return jest.fn().mockReturnValue({ }); // here the expected MUI styles });
    }),
}
));


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
   const goToRegisterPageButton = await findByTestId('load-signup-page-testid');
    return {
        loginEmailField,
        loginEmailFieldWrapper,
        loginPasswordWrapper,
        loginErrPasswordResponse,
        loginErrEmailResponse,
        formLogin,
        loginPasswordField,
        submitButton,
        hideAndShowPasswordButton,
        goToRegisterPageButton
    }
}


describe('Login component', () => {
    

   afterEach(()=>{
     useDispatchSpy.mockClear();
     jest.resetAllMocks();
   })

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

    it('submit form',async()=>
    {
      const mockDispatchFn = jest.fn()
      useDispatchSpy.mockReturnValue(mockDispatchFn);
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
           let apiCallRes:any = {
             success:true,
             response:{
               token:'dewww'
             }
           }
           let cookiesSetRes:any = true;
          jest.spyOn(AuthApi,'LoginApiCall').
          mockImplementationOnce( ()=>  
          new Promise(function (resolve) { 
            resolve(apiCallRes);
          }) );
          jest.spyOn(Cookies,'set').mockImplementationOnce(()=>cookiesSetRes);

          fireEvent.submit(formLogin);
          
         await waitFor(()=>{
            expect(loginErrEmailResponse.innerHTML).toBe("");
            expect(loginErrPasswordResponse.innerHTML).toBe(''); 

            expect(mockHistoryPush).toHaveBeenCalled();
         expect(mockHistoryPush).toHaveBeenCalledWith('/user/gallery-list');
         expect(mockDispatchFn).toHaveBeenCalled();
         expect(mockDispatchFn).toHaveBeenCalledTimes(1);
        
         });   
    });


    it('toggles password field to text',async()=>
    {
       const {hideAndShowPasswordButton,loginPasswordField} = await setup();
       fireEvent.click(hideAndShowPasswordButton);
      await waitFor(()=>{
         expect(loginPasswordField.type).toBe('text');
       })

    

    });   

  it('calls usestyles',async()=>
    {
       await setup();
       expect(usingCustomMaterialStyles.useStyles).toHaveBeenCalled();
    })  


    it('moves to register page', async()=>
    {
      const {goToRegisterPageButton} = await setup();
      userEvent.click(goToRegisterPageButton);
      expect(mockHistoryPush).toHaveBeenCalled();
      expect(mockHistoryPush).toHaveBeenCalledWith('/auth/register');

    })

})
