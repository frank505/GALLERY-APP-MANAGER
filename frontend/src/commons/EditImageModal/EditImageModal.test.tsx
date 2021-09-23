import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, fireEvent, waitForElement,
     waitFor, findByTestId, getByText, cleanup } from "@testing-library/react";
import * as ReactRedux from 'react-redux';
import EditImageModal from './EditImageModal';
import userEvent from '@testing-library/user-event';





const mockHistoryPush = jest.fn();


     

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
      <EditImageModal 
      filePath="ddddd.png" 
      title="hello" 
      id="10"/>

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
     const fileInput:any = await findByTestId('edit-filename'); 
     const errorTitleResponse  = await findByTestId('error-title-content');
     const errorFileNameResponse = await findByTestId('error-filename-content');
    const formSubmit = await findByTestId("submit-form-edit-modal");
    return {
      responseModalDiv,
      titleFormInputWrapper,
      titleInput,
      fileInput,
      errorTitleResponse,
      errorFileNameResponse,
      formSubmit
    }
}


describe('Edit modal Component', () => {
  
    let file:any;


   beforeEach(()=>{
    // useDispatchSpy.mockClear();
    file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    })  


   afterEach(()=>{
       
    //  useDispatchSpy.mockClear();
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

       expect(titleInput.value).not.toBe('');
    
   expect(errorFileNameResponse.innerHTML).toBe(''); 

    });



    it('submits form', async()=>{
     
      const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch'); 
      const fakeResponse = Promise.resolve({});
      const mRes = { json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)) };
      let originFetch = jest.fn().mockResolvedValue(mRes as any);
      (global as any).fetch = originFetch;

      const {
     formSubmit
      } = await setup();

  
    fireEvent.submit(formSubmit);  
   
    await waitFor(()=>{

       expect(useDispatchSpy).toHaveBeenCalled();
       expect(originFetch).toHaveBeenCalled();

    });


    });

   

})
