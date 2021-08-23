import React,{useState,useEffect} from 'react';
import { Card,
    TextField,
    Button,
    LinearProgress,
    InputAdornment,
    Grid,
    GridSpacing,
IconButton
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Formik, FormikErrors, FormikValues, useFormik } from 'formik';
import Icon from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useStyles} from './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormFields } from '../../../helpers/helperFunc';
import './register.scss'; 
import { validate } from './RegisterValidation';
import { RegisterApiCall } from '../../../apicalls/auth/AuthApiCalls';
import { Alert } from '@material-ui/lab';







 const Register:React.FC<{}> = () => {


    const [showPassword,setShowPassword] = useState(false);

    const [response,setResponse] = useState<any>('');
  
    const classes = useStyles();
  
    const dispatch =  useDispatch();

    const history = useHistory();

  const formik:FormikValues = useFormik({
    initialValues: {
      name:'',
      password: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      registerRequest(values);   
    },

  });
  
  const registerRequest =  (credentials:any):void  =>
  {
  
    setResponse('loading');

    RegisterApiCall(credentials).then((data:any)=>
   {
     console.log(data);
      setResponse(data);
   });

  }

  
 


  
const handleClickShowPassword = (): void =>   
{
  showPassword==false? setShowPassword(true): setShowPassword(false);
};

const loadLoginPage = ():void =>
{
    history.push('/auth/login');
}


    return (
        <div className="container" id="containerRegister">
        
        <div className="row">
           
           <div className="col-md-3"></div>

            <div className="col-md-6">

            <Card className="card-item">
             
          

        <form  className="form-container" 
         onSubmit={formik.handleSubmit} data-testid='form-register-container'> 
       
        <div className="registerCredentialsInfo"><h4>REGISTER HERE</h4></div>

        <div className="response responseContentDiv" 
        data-testid="responseLoginDiv">
         
             {
               response==''?
                null 
                :
                response == 'loading'?
                'Loading....'
                :
                 response.hasOwnProperty('success') && response.success==false?
                 <Alert severity="error">{response.response.message}</Alert>
                 :
                 response.hasOwnProperty('success') && response.success==true?
                 <Alert severity="success">{response.response}</Alert>
                 :
                 null
             }
             
           </div>
       
           <div>
       <TextField
      type="text"
      className="auth-form-input register-name"
      margin="normal"
      variant="outlined"
      label="name"
      id="name"
      name="name"
      data-testid="register-name-form"
      onChange={formik.handleChange}
      value={formik.values.name}
    />
       </div>
    
       <div className="error_form_response" data-testid="register-name-validation-response">
       {formik.errors.name ? <div>{formik.errors.name}</div> : null}
     
    </div>

       <div>
       <TextField
      type="email"
      className="auth-form-input register-email"
      margin="normal"
      variant="outlined"
      label="email"
      id="email"
      name="email"
      data-testid="register-email-form"
      onChange={formik.handleChange}
      value={formik.values.email}
    />
       </div>
    
       <div className="error_form_response" data-testid="register-email-validation-response">
       {formik.errors.email ? <div>{formik.errors.email}</div> : null}
     
    </div>

      <div>

      <TextField
           className="auth-form-input register-password"
      label="Password"
      type={showPassword==false?"password":"text"}
      margin="normal"
      variant="outlined"
      id="password"
      data-testid="register-password-form"
      onChange={formik.handleChange}
         value={formik.values.password}
      InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                     <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            data-testid="hide-and-show-button"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
                    </InputAdornment>,
                  }}
      
    />

       <div className="error_form_response" data-testid="register-password-validation-response">
      
       {formik.errors.password ? <div>{formik.errors.password}</div> : null}
     
    </div>


          <div>
         


  <Button
    type="submit"
    variant="contained"
    color="primary"
    className="btn-submit-register"
    data-testid="btn-submit-user-form"
 endIcon={<AccountCircleIcon/>}
  >
     REGISTER
  </Button>
      

  <div className="sign-up-link" style={{marginTop:'5px',marginBottom:'5px'}}>
                   <b>don have account?&nbsp;
                       <a 
                       className="sign-color-change"
                       onClick={loadLoginPage}
                       data-testid="load-login-page-testid"
                       >Login Here</a>
                       </b>
                   </div>

          </div>
    
       </div>  
    
    


        </form>

  

     </Card>  
            </div>

      <div className="col-md-3"></div>

        </div>

        
 
        </div>
    )
}

export default Register;

