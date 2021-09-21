import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { render,waitFor, fireEvent, cleanup,getByText} from "@testing-library/react";
import GalleryLists from './GalleryLists';
import * as GalleryListJson from './Gallerylist.json';
import * as fetchMock from 'jest-fetch-mock'
import * as ReactRedux from'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'




const middlewares = [thunk]
const mockStore = createMockStore(middlewares)



const renderComponent = () =>
{
  const Comp =  render(
    <Provider store={store} >
      <GalleryLists />
    </Provider>    
    );



    return Comp;
}


const setup = async() =>
{
    const { findByTestId,getByLabelText,getByText,container,getByDisplayValue } = renderComponent();
    const paginationComponent = await findByTestId('pagination-component');
   const paginationButton = paginationComponent?.querySelector('ul')?.
    querySelectorAll('li');
    const deleteIcon  = await container.querySelectorAll('.delete-icon');
    // const editIcon = await findByTestId('edit-icon');
    return {
       paginationComponent,
        findByTestId,
        paginationButton,
        deleteIcon,
        container,
        // editIcon,
        getByLabelText,
        getByText,
        getByDisplayValue
    }
}

describe('Login component', () => 
{

 
   
  beforeEach(() => {
    fetchMock.default.resetMocks();
  });

  afterEach(()=>{
     fetchMock.default.resetMocks();
  })

  

 it('renders component correctly',()=>
 {
   renderComponent();
 })  

 it('calls fetch api for initial data loads and pagination', async()=>
 {
  const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch').
  mockImplementationOnce(()=>store.dispatch); 
    const fakeResponse = Promise.resolve(GalleryListJson);
    const mRes = { json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)) };
    let originFetch = jest.fn().mockResolvedValue(mRes as any);
    (global as any).fetch = originFetch;
    const {paginationComponent,findByTestId,paginationButton} = await setup();
   await waitFor(()=>  findByTestId('content-test-margin'));
    paginationComponent.querySelectorAll(".MuiPaginationItem-page").
    forEach( async(item:any,index:number)=>
    {
      
      let itemAttr = item.getAttribute("aria-label");
      if(itemAttr!="Go to previous page" && itemAttr!="Go to next page")
      {
        console.log(item.getAttribute('aria-label'));
       fireEvent.click(item);
      }
    })

   
    await waitFor(()=>  {
      expect(originFetch).toHaveBeenCalled();  
      expect(useDispatchSpy).toHaveBeenCalled();  
      });
    
      originFetch = (global as any).fetch;
 });



 it('deletes an item ', async()=>
 {
  const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch').
  mockImplementationOnce(()=>store.dispatch); 
    const fakeResponse = Promise.resolve(GalleryListJson);
    const mRes = { json: jest.fn().mockResolvedValue( Promise.resolve(fakeResponse)) };
    let originFetch = jest.fn().mockResolvedValue(mRes as any);
    (global as any).fetch = originFetch; 
  const {deleteIcon,getByLabelText,container,getByText} = await setup();

  expect(originFetch).toHaveBeenCalledTimes(1);

   fireEvent.click(deleteIcon[0]);

   await waitFor(()=>{
     expect(getByLabelText('Are you sure?')).toBeVisible()
     expect(getByText('Yes, delete it!')).toBeVisible();
    });

    let yesDelete:any = getByText('Yes, delete it!');
   await fireEvent.click(yesDelete);
 
    await waitFor(()=>{
      expect(originFetch).toHaveBeenCalledTimes(2);
    });
 
    
 })

 

})
