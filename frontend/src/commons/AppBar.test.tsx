import { Provider } from "react-redux";
import { render, fireEvent,waitFor,screen } from "@testing-library/react";
import { store } from "../store/store";
import * as AppBar from "./AppBar";
import Cookies from "js-cookie";
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';





const mockHistoryPush = jest.fn();

// jest.mock('@material-ui/core/styles', () => ({
//     ...jest.requireActual('@material-ui/core/styles'),
//     // makeStyles: jest.fn().mockReturnValue(jest.fn()),
//     makeStyles: jest.fn().mockImplementation(callback => {
//         callback({ options: { common: { fonts: { sizes: {} } } } }); 
//         return jest.fn().mockReturnValue({ }); // here the expected MUI styles });
//       }),
//     //   alpha: jest.fn().mockReturnValueOnce({}),
//     //   theme:jest.fn().mockImplementationOnce(()=>{
//     //     return {
//     //         spacing:jest.fn().mockImplementationOnce(()=>{})
//     //     }
//     //   })
//   }
//   ));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderComponent = () =>
{
    return render(
     
      <Provider store={store} >
         <AppBar.default/>
          </Provider>
      
    );
}

const setup = async() =>
{
    const {findByTestId} = renderComponent();
        const menuButtonOpen = await findByTestId('menu-open');
        const logout = await findByTestId('logout');
        return {
            menuButtonOpen,
            logout
        }
}


describe('app bar content', () => {
    
    it('renders correctly', ()=>{
        renderComponent();
    });

    it('open profile menu and logs out correctly', async() =>
    {
        const { menuButtonOpen,logout } = await setup();
        jest.spyOn(Cookies,'remove').mockImplementationOnce(()=>{});
        fireEvent.click(menuButtonOpen);
        await waitFor(()=>{
           screen.getByText('LogOut');
           fireEvent.click(logout);
           expect(mockHistoryPush).toHaveBeenCalled();
           expect(Cookies.remove).toHaveBeenCalled();

         });   
    });


    // it('calls usestyles',async()=>
    // {
    //    await setup();
    //    expect(AppBar.useStyles).toHaveBeenCalled();
    // })
    

})
