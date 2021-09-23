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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditImageModal from '../../../commons/EditImageModal/EditImageModal';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';



 const GalleryLists:React.FC<{}> = ():ReactElement => 
{
    const dispatch:Dispatch<AnyAction> = useDispatch();
    const galleryList = useSelector((state:RootState) => state.gallery.galleryList);
    const [paginatedData,setPaginatedData ] = useState<Array<any>>([]);
    const [activePage,setActivePage] = useState<any>(1);
    const [totalPages,setTotalPages] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    const [editData,setEditData] = useState<any>({
      title:"",
      filePath:"",
      id:""
    }); 
    

  const handleOpen = (title:string,id:string,filePath:string) => 
  {
    setEditData({
      ...editData, title:title,id:id,filePath:filePath
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    

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
                        <EditIcon 
                        onClick={()=>handleOpen(item.title,item.id,item.image)}   
                        />
                        &nbsp; &nbsp;
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
       
      
      {/**modal for editing item */}

         
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
          <div data-testid='edit-content-modal-fade-in'>
          <EditImageModal 
          filePath={editData.filePath} title={editData.title} id={editData.id} />
          </div>
         
        </Fade>
      </Modal> 
     
        </div>
    )
}


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },  
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 3),
    },
  }),
  
);

export default GalleryLists;