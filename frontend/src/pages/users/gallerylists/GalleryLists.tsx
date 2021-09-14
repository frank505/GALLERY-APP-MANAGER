import React, { ReactElement,useEffect,useState } from 'react';
import GalleryCard from './GalleryCard';
import './GalleryLists.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useSelector } from 'react-redux';
import {Dispatch,AnyAction } from 'redux';
import { GetGalleryListAction } from '../../../store/actions/GalleryActions';
import { RootState } from '../../../store/Reducers/RootReducer';
import { Pagination } from '@material-ui/lab';



 const GalleryLists:React.FC<{}> = ():ReactElement => 
{
    const dispatch:Dispatch<AnyAction> = useDispatch();
    const galleryList = useSelector((state:RootState) => state.gallery.galleryList);
    const [paginatedData,setPaginatedData ] = useState<Array<any>>([]);
    const [activePage,setActivePage] = useState<any>(1);
    const [totalPages,setTotalPages] = useState<number>(0);

    

 useEffect(() => {

      dispatch(GetGalleryListAction(1));

     return () => {
       
     }
 }, []);


 useEffect(() => {
    
    if(galleryList?.data?.data.length > 0)
    {
        // console.log('this na the list ooo');
        // console.log(galleryList);
        setPaginatedData(galleryList?.data.data);
        setTotalPages(galleryList?.data?.last_page);
      

    }
    
    

     return () => {
         
     }
 }, [galleryList])



 const goToNextPage = (event: React.ChangeEvent<unknown>,value:number):void =>
 {
     console.log('you click me ooooo chaiiii');
   setActivePage(value);
   dispatch(GetGalleryListAction(value))
 }

    

    return (

        <div className="parent-elem-gallery container" data-testid="parent-elem-gallery-list">

               {paginatedData.length > 0?
               
               <div className="row" data-testid="content-test-margin">

               {
                   paginatedData.map((item:any,index:number)=>
                   (
                    <div className="col-md-4 margin-top" data-testid={`pager-loop-${index}`} key={index.toString()}>
               <GalleryCard
                items={item}
               /> 
               </div>
                   ))
               }
              
             
               


           </div>
               :
               null
               }
           



           <Pagination 
             data-testid="pagination-component"
             page={activePage}
             count={totalPages}
             onChange={goToNextPage}
           />
       
   
        </div>
    )
}


export default GalleryLists;