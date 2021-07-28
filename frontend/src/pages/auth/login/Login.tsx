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
import { Formik, FormikErrors, useFormik } from 'formik';
import Icon from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useStyles} from './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormFields } from '../../../helpers/helperFunc';
import './login.scss'; 
import { validate } from './LoginValidation';
import { LoginApiCall } from '../../../apicalls/auth/AuthApiCalls';
import { Alert } from '@material-ui/lab';
import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '../../../constants';






 const Login:React.FC<{}> = () => {


    const [showPassword,setShowPassword] = useState(false);

    const [response,setResponse] = useState<any>('');
  
    const classes = useStyles();
  
    const dispatch =  useDispatch();

    const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      loginRequest(values);   
    },

  });
  
  const loginRequest =  (credentials:any):void  =>
  {
    setResponse('loading');

    LoginApiCall(credentials).then((data:any)=>
   {
     console.log(data);
      setResponse(data);
   });

  }

  
  useEffect(() => {
    
    if(response!='' && response!='loading')
    {
      if(response.hasOwnProperty('success') && response.success==true)
      {
        console.log(response);
        console.log(response.response.token);
        Cookies.set(JWT_TOKEN_KEY,response.response.token);
      
        history.push('/user/gallery-list');
      }
    }

    return () => {
     
    }
  }, [response])


  
const handleClickShowPassword = (): void =>   
{
  showPassword==false? setShowPassword(true): setShowPassword(false);
};

const loadSignUpPage = ():void =>
{
    history.push('/auth/register');
}


    return (
        <div className="container" id="containerLogin">
        
        <div className="row">
           
           <div className="col-md-3"></div>

            <div className="col-md-6">

            <Card className="card-item">
             
          

        <form  className="form-container" 
         onSubmit={formik.handleSubmit} data-testid='form-login-container'> 
       
        <div className="loginCredentialsInfo"><h4>LOGIN HERE</h4></div>

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
                 null
             }
             
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
      data-testid="login-email-form"
      onChange={formik.handleChange}
      value={formik.values.email}
    />
       </div>
    
       <div className="error_form_response" data-testid="login-email-validation-response">
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
      data-testid="login-password-form"
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

       <div className="error_form_response" data-testid="login-password-validation-response">
      
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
      LOGIN
  </Button>
      

  <div className="sign-up-link" style={{marginTop:'5px',marginBottom:'5px'}}>
                   <b>dont have an account?&nbsp;
                       <a 
                       className="sign-color-change"
                       onClick={loadSignUpPage}
                       data-testid="load-signup-page-testid"
                       >Sign Up Here</a>
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

export default Login;

