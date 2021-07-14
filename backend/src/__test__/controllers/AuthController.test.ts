import 'reflect-metadata'
import { AuthController } from "../../controllers/AuthController";
import * as mocks from 'node-mocks-http';
import UserService from "../../services/UserService";
import CustomResponseHelper from '../../helpers/CustomResponseHelper';
import { LoginUserValidation } from '../../middleware/validators/LoginUserValidator';
import { generateJwtToken } from '../../helpers/generateJwt';
import  {UserEntity}  from '../../database/entities/UserEntity';
import { RegisterUserValidation } from '../../middleware/validators/RegisterUserValidator';

const userName = 'nnamdi';
const userEmail = "ddd@gmail.com";
const userPassword = '$FRANKcode245';
const hashPassword = '$2a$08$MYTB4agIJnR6ujyvRSPjzOaZkg4it1VF9EIXYSVH4yujmfFTWy/Hy';

jest.mock('../../services/UserService');
jest.mock('../../helpers/CustomResponseHelper');
jest.mock('../../middleware/validators/LoginUserValidator');
jest.mock('../../helpers/generateJwt');
jest.mock('../../database/entities/UserEntity');
jest.mock('../../middleware/validators/RegisterUserValidator');

   

describe('Test Auth Controller', () => {
    
  afterEach( async()=>{
    jest.restoreAllMocks();
  });


  it('calls the Login function',async()=>
  {
    const user = new UserService;
    const customRes = new CustomResponseHelper;
    const authCtrl = new AuthController(user,customRes);
   
     const mReq:mocks.MockRequest<any> = {
      body: {
        email:userEmail,
        password: userPassword,
      },
    };
    const mRes:mocks.MockRequest<any> = {
      status: jest.fn().mockReturnThis(),
      send:jest.fn(),
      json: jest.fn(),  
    };
    user.getSingleUserDetails = jest.fn().mockReturnValueOnce({email:userEmail,password:hashPassword});
    authCtrl.checkInvalidPassword = jest.fn().mockImplementationOnce(()=>true);
   await authCtrl.Login(mReq,mRes);
  expect(LoginUserValidation).toHaveBeenCalledTimes(1);
  expect(user.getSingleUserDetails).toHaveBeenCalledTimes(1);
  expect(customRes.setHttpResponse).toHaveBeenCalledTimes(1);
  expect(authCtrl.checkInvalidPassword).toHaveBeenCalledTimes(1);
  expect(generateJwtToken).toHaveBeenCalled(); 

  });


  it('calls check invalid password correctly',async()=>
  {
    const user = new UserService;
    const customRes = new CustomResponseHelper;
    const authCtrl = new AuthController(user,customRes);

    const mReq:mocks.MockRequest<any> = {
      body: {
        email:userEmail,
        password: userPassword,
      },
    };
    const mRes:mocks.MockRequest<any> = {
      status: jest.fn().mockReturnThis(),
      send:jest.fn(),
      json: jest.fn(),  
    };
    authCtrl.checkIfUnencryptedPasswordIsValid = jest.fn().mockImplementationOnce(()=>{ return true });    
    const userEntity:UserEntity = {email:userEmail,password:hashPassword};
   const res =  await authCtrl.checkInvalidPassword(mReq,mRes,userEntity);
   expect(authCtrl.checkIfUnencryptedPasswordIsValid).toHaveBeenCalled();
  });

  it('ensures register function is called',async()=>{
    const user = new UserService;
    const customRes = new CustomResponseHelper;
    const authCtrl = new AuthController(user,customRes);

    const mReq:mocks.MockRequest<any> = {
      body: {
        name:userName,
        email:userEmail,
        password: userPassword,
      },
    };
    const mRes:mocks.MockRequest<any> = {
      status: jest.fn().mockReturnThis(),
      send:jest.fn(),
      json: jest.fn(),  
    };
    user.checkEmailAlreadyExist = jest.fn().mockResolvedValueOnce(0);
    await authCtrl.Register(mReq,mRes);
    expect(user.checkEmailAlreadyExist).toHaveBeenCalled();
    expect(RegisterUserValidation).toHaveBeenCalled();
    expect(customRes.setHttpResponse).toHaveBeenCalled();
  });


  it('calls check if unencrypted password is valid',async()=>{
    const user = new UserService;
    const customRes = new CustomResponseHelper;
    const authCtrl = new AuthController(user,customRes);
  let value =  await authCtrl.checkIfUnencryptedPasswordIsValid(userPassword,hashPassword);
  expect(value).toBe(true);
  });

});