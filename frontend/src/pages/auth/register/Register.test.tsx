import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Register from './Register';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText } from "@testing-library/react";
import { HashRouter,  Route, Switch, Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as AuthApi from '../../../apicalls/auth/AuthApiCalls';
import Cookies from 'js-cookie';
import * as usingCustomMaterialStyles from './styles';




const mockHistoryPush = jest.fn();

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
      <Register/>
    </Provider>    
    );



    return Comp;
}


const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const registerEmailFieldWrapper = await findByTestId('register-email-form');
    const registerEmailField:any = registerEmailFieldWrapper.querySelector('#email');   
    const registerPasswordWrapper = await findByTestId('register-password-form');
    const registerPasswordField:any = registerPasswordWrapper.querySelector('#password');
    const registerErrPasswordResponse = await findByTestId('register-password-validation-response');
    const registerErrEmailResponse = await findByTestId('register-email-validation-response');
    const registerNameFieldWrapper = await findByTestId('register-name-form');
    const registerNameField:any  = registerNameFieldWrapper.querySelector("#name");
    const registerErrNameResponse = await findByTestId('register-name-validation-response');
    const formregister = await findByTestId('form-register-container');
   const  submitButton = await findByTestId('btn-submit-user-form');
   const hideAndShowPasswordButton = await findByTestId('hide-and-show-button');
   const goToLoginPageButton = await findByTestId('load-login-page-testid');
    return {
        registerEmailField,
        registerEmailFieldWrapper,
        registerPasswordWrapper,
        registerErrPasswordResponse,
        registerErrEmailResponse,
        registerNameFieldWrapper,
        registerNameField,
        registerErrNameResponse,
        formregister,
        registerPasswordField,
        submitButton,
        hideAndShowPasswordButton,
        goToLoginPageButton
    }
}


describe('register component', () => {
    
   afterEach(()=>{
     jest.resetAllMocks();
   })

    it('renders component properly',()=>
    {
      renderComponent();
    });

    it('validates input on formchange',async()=>
    {
     
       const {registerEmailField,
         registerErrEmailResponse,
         registerPasswordField, 
         registerErrPasswordResponse,
         registerNameField,
         registerErrNameResponse
        } = await setup();
         userEvent.type(registerEmailField,'ddd');
       await waitFor(()=>{
        expect(registerErrEmailResponse.innerHTML).toBe("<div>Invalid email address</div>") 
       });
         userEvent.type(registerEmailField,'akpufranklin2@gmail.com');
         userEvent.type(registerPasswordField,'sss');
         userEvent.type(registerNameField,'sddff');
         await waitFor(()=>{
            expect(registerErrEmailResponse.innerHTML).toBe("");
            expect(registerErrPasswordResponse.innerHTML).toBe(''); 
            expect(registerErrNameResponse).not.toBe('');
         })
     

    });

    it('submit form',async()=>
    {
      
            const {formregister,
                registerErrPasswordResponse,
                registerErrEmailResponse,
                registerErrNameResponse,
                 submitButton,
                registerPasswordField,
                registerEmailField,
                registerNameField
                } = await setup();
                fireEvent.submit(formregister); 
            await waitFor(()=>{
            expect(registerErrEmailResponse.innerHTML).toBe("<div>Invalid email address</div>") 
            expect(registerErrPasswordResponse.innerHTML).toBe("<div>Password Field is Required</div>");
            expect(registerErrNameResponse.innerHTML).toBe("<div>Name Field is Required</div>"); 
            });
           userEvent.type(registerEmailField,'akpufranklin2@gmail.com');
           userEvent.type(registerPasswordField,'sss');
           userEvent.type(registerNameField,'desmond');
           let apiCallRes:any = {
             success:true,
             response:'successfully saved'
             
           }
           let cookiesSetRes:any = true;
          jest.spyOn(AuthApi,'RegisterApiCall').
          mockImplementationOnce( ()=>  
          new Promise(function (resolve) { 
            resolve(apiCallRes);
          }) );
          jest.spyOn(Cookies,'set').mockImplementationOnce(()=>cookiesSetRes);

          fireEvent.submit(formregister);
          
         await waitFor(()=>{
            expect(registerErrEmailResponse.innerHTML).toBe("");
            expect(registerErrPasswordResponse.innerHTML).toBe(''); 
            expect(registerErrNameResponse.innerHTML).toBe('');
         });   
    });


    it('toggles password field to text',async()=>
    {
       const {hideAndShowPasswordButton,registerPasswordField} = await setup();
       fireEvent.click(hideAndShowPasswordButton);
      await waitFor(()=>{
         expect(registerPasswordField.type).toBe('text');
       })

    

    });   

  it('calls usestyles',async()=>
    {
       await setup();
       expect(usingCustomMaterialStyles.useStyles).toHaveBeenCalled();
    })  


    it('moves to register page', async()=>
    {
      const {goToLoginPageButton} = await setup();
      userEvent.click(goToLoginPageButton);
      expect(mockHistoryPush).toHaveBeenCalled();
      expect(mockHistoryPush).toHaveBeenCalledWith('/auth/login');

    })

})
