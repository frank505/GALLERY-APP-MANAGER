import React,{Ref, useRef, useState } from 'react';
import { 
    Typography, 
    TextField,
   IconButton,
   Button,
   Card,
   CardActions, 
   CardContent,
   makeStyles
} from '@material-ui/core';
import './AddImageModal.scss';
import { useFormik,FormikValues } from 'formik';
import {validate} from './AddImageValidation';
import { CreateGalleryApiCall } from '../../apicalls/user/GalleryApiCall';
import { Alert } from '@material-ui/lab';
import { useDispatch,useSelector } from 'react-redux';
import {Dispatch,AnyAction } from 'redux';
import { GetGalleryListAction } from '../../store/actions/GalleryActions';


const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const  AddImageModal:React.FC<{}> = () =>
{
  const classes = useStyles();

  const dispatch:Dispatch<AnyAction> = useDispatch();

  const [response, setResponse] = useState<any>('');

  let fileInput = useRef<any>();

  const formik:FormikValues = useFormik({
    initialValues: {
      filename: '',
      title: '',
    },
    validate : (values) =>
    {
      let dataItem:object = {
        title :values.title,
        filename:fileInput.current.files.length==0?'':fileInput.current.files[0].name
      }

     return  validate(dataItem);
    },
    onSubmit: values => 
    {
      setResponse('');
     let data:FormData =  addImageGalleryContent(values);
     uploadFileData(data)
    },

  });


  const addImageGalleryContent = (values:any):FormData =>
  {
    const formInput:FormData = new FormData();
    formInput.append('title',values.title);
    formInput.append('image',fileInput.current.files[0]);
    return formInput;
  }


  const uploadFileData = (formData:FormData) =>
  {
    setResponse('loading');
    CreateGalleryApiCall(formData).then((data:any)=>
    {
      console.log(data);
       setResponse(data);
       dispatch(GetGalleryListAction(1));

    });

  }





  return (
    
    <Card className={classes.root} variant="outlined" >
      
       <form  onSubmit={formik.handleSubmit} data-testid="submit-form-add-modal" >

          <div className="container" id="containerModalAddContent" >

              <div className="row"> 
             

               <div className="col-md-12">

               <div className="CredentialsInfo" 
               style={{fontWeight:'bold',color:'red'}}><h5>LOGIN HERE</h5>
              
              <div className="response responseContentDiv" 
                data-testid="response-modal-div">
         
             {
               response==''?
                null 
                :
                response == 'loading'?
                'Loading....'
                :
                 response?.hasOwnProperty('success')  && response?.success==false?
                 <Alert severity="error">{response.response}</Alert>
                 :
                 response?.hasOwnProperty('success') && response?.success==true?
                 <Alert severity="success">{response.response}</Alert>
                 :
                 null
             }
             
           </div>

               </div>
                   
        <div>
       <TextField
      type="text"
      className="title-textinput"
      margin="normal"
      variant="outlined"
      label="image title"
      id="title"
      name="title"
      data-testid="title-input"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.title}
    />
       </div>
    
       <div className="error_form_response" data-testid="error-title-content">
       {formik.errors.title ? <div>{formik.errors.title}</div> : null}
       </div>


    
      <div style={{marginTop:'15px'}}>
   
     <input type="file" 
      onChange={formik.handleChange}
      value={formik.values.filename}
      id="filename"
      name="filename"
      data-testid="filename"
      ref={el => fileInput.current = el}
     />
      </div>

      <div className="error_form_response" data-testid="error-filename-content">
       {formik.errors.filename ? <div>{formik.errors.filename}</div> : null}
       </div>



      <Button
    type="submit"
    variant="contained"
    color="primary"
    className="btn-submit-modal-image-add"
    data-testid="btn-submit-image-title-form"
    >
      LOGIN
     </Button>

    </div>

         

              </div>


          </div>

      

         

        </form>
    </Card>
   
  );
}

export default AddImageModal;