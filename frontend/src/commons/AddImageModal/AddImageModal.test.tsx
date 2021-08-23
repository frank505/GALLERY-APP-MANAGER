import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText, cleanup } from "@testing-library/react";
import * as ReactRedux from 'react-redux';
import AddImageModal from './AddImageModal';
import userEvent from '@testing-library/user-event';





const mockHistoryPush = jest.fn();
const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch'); 
     

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));




// jest.mock('@material-ui/core/styles', () => ({
//   ...jest.requireActual('@material-ui/core/styles'),
//   // makeStyles: jest.fn().mockReturnValue(jest.fn()),
//   makeStyles: jest.fn().mockImplementation(callback => {
//       callback({ options: { common: { fonts: { sizes: {} } } } }); // this will execute the fn passed in which is missing the coverage
//       return jest.fn().mockReturnValue({ }); // here the expected MUI styles });
//     }),
// }
// ));


const renderComponent = () =>
{
  const Comp =  render(
    <Provider store={store} >
      <AddImageModal/>
    </Provider>    
    );

    return Comp;
}


const setup = async() =>
{
    const {findByTestId} = renderComponent();
    const responseModalDiv = await findByTestId('response-modal-div');
     const titleFormInputWrapper  = await findByTestId('title-input');
     const titleInput:any = titleFormInputWrapper.querySelector('input');
     const fileInput:any = await findByTestId('filename'); 
     const errorTitleResponse  = await findByTestId('error-title-content');
     const errorFileNameResponse = await findByTestId('error-filename-content');

    return {
      responseModalDiv,
      titleFormInputWrapper,
      titleInput,
      fileInput,
      errorTitleResponse,
      errorFileNameResponse
    }
}


describe('Login component', () => {
  
    let file:any;


   beforeEach(()=>{
    file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    })  


   afterEach(()=>{
       
     useDispatchSpy.mockClear();
     jest.resetAllMocks();
     cleanup();
   })

    it('renders component properly',()=>
    {
      renderComponent();
    });


    it('validates input on formchange',async()=>
    {
     
       const {
           responseModalDiv,
        titleFormInputWrapper,
        titleInput,
        fileInput,
        errorTitleResponse,
        errorFileNameResponse
         } = await setup();

        userEvent.type(titleInput, 'sss');

       await waitFor(()=>{
       expect(errorTitleResponse.innerHTML).toBe("") 
       });
       
    // simulate ulpoad event and wait until finish 
    await waitFor(() =>{
      fireEvent.change(fileInput, {
        target: { files: [file] },
      })
      
    });
   expect(errorFileNameResponse.innerHTML).toBe(''); 

    });

   

})
