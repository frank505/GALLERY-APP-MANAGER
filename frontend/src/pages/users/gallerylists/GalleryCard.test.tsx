import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import GalleryCard,{GalleryCardProps} from './GalleryCard';
import { render} from "@testing-library/react";



 const items:any = {
   title:'hello',
   image:'ddddd.png'
 };





const renderComponent = () =>
{
  const Comp =  render(
    <Provider store={store} >
      <GalleryCard items={items} />
    </Provider>    
    );



    return Comp;
}



describe('Login component', () => {
    

 it('renders component correctly',()=>{
   renderComponent();
 })  

 it('element is present', async() =>
 {
  const { findByTestId } = renderComponent();
 const elem = await findByTestId('img-display-is-present');
 expect(elem).toBeVisible();
 });

})
