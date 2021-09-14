import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { render,waitFor, fireEvent, cleanup} from "@testing-library/react";
import GalleryLists from './GalleryLists';
import * as GalleryListJson from './Gallerylist.json';
import * as fetchMock from 'jest-fetch-mock'








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
    const { findByTestId } = renderComponent();
    const paginationComponent = await findByTestId('pagination-component');
   const paginationButton = paginationComponent?.querySelector('ul')?.
    querySelectorAll('li');
  
    return {
       paginationComponent,
        findByTestId,
        paginationButton
    }
}

describe('Login component', () => {
    
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
      expect(originFetch).toBeCalledTimes(7);    
      });
    

 });


 

})
