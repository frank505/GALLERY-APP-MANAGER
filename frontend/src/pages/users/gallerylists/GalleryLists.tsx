import React, { ReactElement,useEffect,useState } from 'react';
import GalleryCard from './GalleryCard';
import './GalleryLists.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useSelector } from 'react-redux';
import {Dispatch,AnyAction } from 'redux';
import { GetGalleryListAction } from '../../../store/actions/GalleryActions';
import { RootState } from '../../../store/Reducers/RootReducer';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { RemoveRedEye } from '@material-ui/icons';
import * as swal  from 'sweetalert2';
import { deleteGalleryApiCall } from '../../../apicalls/user/GalleryApiCall';



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


 const deleteUser = (id:any):void =>
 {
     deleteUserOptions(id);
 }
    

const deleteUserOptions = (id:any) =>
{
  
    swal.default.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this  file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result:any) => {
        if (result.isConfirmed) 
        {
          deleteUserApiCall(id);
         
     
        } else if (result.dismiss === swal.default.DismissReason.cancel) {
          swal.default.fire(
            'Cancelled',
            'file is safe :)',
            'error'
          )
        }
      })

    
         
   
} 



const deleteUserApiCall = (id:any):Promise<any> =>
{
  return deleteGalleryApiCall(id).then((data:any)=>
  {
    if(data.success == true)
    {
      swal.default.fire(
        'Deleted!',
        ' file has been deleted.',
        'success'
      );

      let filteredItems = paginatedData.filter(
        (items) => items.id != id,
      );
      
      setPaginatedData(filteredItems);
    }
       
   });

}

    return (

        <div className="parent-elem-gallery container" data-testid="parent-elem-gallery-list">

               {paginatedData.length > 0?
               
               <div className="row" data-testid="content-test-margin">

               {
                   paginatedData.map((item:any,index:number)=>
                   (
                    <div className="col-md-4 margin-top" 
                    data-testid={`pager-loop-${index}`} key={index.toString()}
                    >
                        <div style={{marginBottom:10}}>
                            <DeleteIcon
                            className="delete-icon" 
                            data-testid="delete-icon"
                            onClick={()=>deleteUser(item.id)}
                                  />&nbsp; &nbsp;
                        <EditIcon onClick={()=>alert('edited')}   />
                        &nbsp; &nbsp;
                        <RemoveRedEye />
                         </div>
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