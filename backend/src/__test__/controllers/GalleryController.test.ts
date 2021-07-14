import 'reflect-metadata';
import { GalleryController } from "../../controllers/GalleryController";
import { GalleryEntity } from "../../database/entities/GalleryEntity";
import  UserEntity  from "../../database/entities/UserEntity";
import CustomResponseHelper from "../../helpers/CustomResponseHelper";
import GalleryService from "../../services/GalleryService";
import UserService from "../../services/UserService";
import * as mocks from 'node-mocks-http';
import * as payload from "../../middleware/jwt/getUserPayload";
import  formidable from 'formidable';
import * as galleryValidates from '../../middleware/validators/CreateGalleryValidator';
import * as updateGalleryValidates from '../../middleware/validators/UpdateGalleryValidator'
import fs from 'fs';
import path from 'path';


const userName = 'nnamdi';
const userEmail = "ddd@gmail.com";
const userPassword = '$FRANKcode245';
const hashPassword = '$2a$08$MYTB4agIJnR6ujyvRSPjzOaZkg4it1VF9EIXYSVH4yujmfFTWy/Hy';


jest.mock('../../services/UserService');
jest.mock('../../helpers/CustomResponseHelper');
jest.mock('../../services/GalleryService');
jest.mock('../../database/entities/GalleryEntity');
jest.mock('../../database/entities/UserEntity');

  jest.mock('formidable', () => {
    const mForm = {
      multiples: false,
      parse: jest.fn(),
    };
    return {
      IncomingForm: jest.fn(() => mForm),
    };
  });



describe('calls index function to get user', () => {
    
    afterEach( async()=>{
        jest.restoreAllMocks();
      });

    it('calls the index function', async()=>
    {
        const user = new UserService;
        const customRes = new CustomResponseHelper;
        const galleryContent = new GalleryService;
        const galleryCtrl = new GalleryController(customRes,galleryContent,user);
        const mReq:mocks.MockRequest<any> = {};
          const mRes:mocks.MockRequest<any> = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn(),
            json: jest.fn(),  
          };
    jest.spyOn(payload,'getUserPayload').mockImplementationOnce(()=>{ return 1;});
    await  galleryCtrl.index(mReq,mRes);
    expect(galleryContent.index).toHaveBeenCalled();
    expect(payload.getUserPayload).toHaveBeenCalled();   
    });


    it('create function is called', async()=>
    {
        const user = new UserService;
        const customRes = new CustomResponseHelper;
        const galleryContent = new GalleryService;
        const galleryCtrl = new GalleryController(customRes,galleryContent,user);
        const fields = {
            title: 'Title',
          };
          const files = {
              image:{
                  path:'../testimage/test.png',
                  name:'test.png'
                }
          };
          const mReq:mocks.MockRequest<any> = {
              fields:fields,
              files:files
          }
          const mRes:mocks.MockRequest<any> = {
            status: jest.fn().mockReturnThis(),
            send:jest.fn(),
            json: jest.fn(),  
          };  
          const form = new formidable.IncomingForm();
          let originalCallback:any;
          form.parse = jest.fn().mockImplementation((req, callback) => {
            originalCallback = callback;
          });

     const spyCreateValidateValue:any = false;
     jest.spyOn(galleryValidates,'validateCreateGallery').mockImplementationOnce(()=> spyCreateValidateValue);
     jest.spyOn(payload,'getUserPayload').mockImplementationOnce(()=>{return {id:1}});
     jest.spyOn(path,'join').mockImplementationOnce(()=>'../testimage/test.jpg');
     jest.spyOn(fs , 'existsSync').mockImplementationOnce(()=> true);
     const fileRawData:any =  {};
     jest.spyOn(fs, 'readFileSync').mockImplementationOnce(()=> fileRawData);
     user.getSingleUserDetailsFromId = jest.fn().mockResolvedValue({id:1,name:userName,email:userEmail});
     jest.spyOn(galleryCtrl,'writeFileOnCreate');
     await galleryCtrl.create(mReq,mRes);
     await originalCallback(undefined, fields, files);
     expect(form.parse).toHaveBeenCalled();
     expect(galleryValidates.validateCreateGallery).toHaveBeenCalled();
     expect(payload.getUserPayload).toHaveBeenCalled(); 
     expect(fs.existsSync).toHaveBeenCalled();
     expect(fs.readFileSync).toHaveBeenCalled();
     expect(galleryCtrl.writeFileOnCreate).toHaveBeenCalled();
    });
  
    it('calls writeFileOnCreate', async()=>
    {
        const user = new UserService;
        const customRes = new CustomResponseHelper;
        const galleryContent = new GalleryService;
        const galleryCtrl = new GalleryController(customRes,galleryContent,user);
        const mRes:mocks.MockRequest<any> = {
          status: jest.fn().mockReturnThis(),
          send:jest.fn(),
          json: jest.fn(),  
        };  
         
        let originalCallback:any;
        jest.spyOn(fs,'writeFile').mockImplementation((directory,rawData,callback) => {
          originalCallback = callback;
        });
        galleryContent.create = jest.fn().mockReturnValueOnce({});
        let galleryEnt:Promise<GalleryEntity> = {} as any;
        let userEnt:Promise<UserEntity> = {} as any;
        customRes.setHttpResponse = jest.fn().mockImplementationOnce(()=>{});
        await galleryCtrl.writeFileOnCreate('',{},mRes,userEnt,'',{});
        await originalCallback(false);
        expect(customRes.setHttpResponse).toHaveBeenCalled();
        expect(galleryContent.create).toHaveBeenCalled();
    });


    it('test update function', async() =>{
      const user = new UserService;
      const customRes = new CustomResponseHelper;
      const galleryContent = new GalleryService;
      const galleryCtrl = new GalleryController(customRes,galleryContent,user);
      const fields = {
          title: 'Title',
        };
        const files = {
            image:{
                path:'../testimage/test.png',
                name:'test.png'
              }
        };
        const params = {
          id:1
        }
        const mReq:mocks.MockRequest<any> = {
            fields:fields,
            files:files,
            params: params
        }
        const mRes:mocks.MockRequest<any> = {
          status: jest.fn().mockReturnThis(),
          send:jest.fn(),
          json: jest.fn(),  
        };  
        const form = new formidable.IncomingForm();
        let originalCallback:any;
        form.parse = jest.fn().mockImplementation((req, callback) => {
          originalCallback = callback;
        });

   const spyCreateValidateValue:any = {errorStatus:false};
   jest.spyOn(updateGalleryValidates,'UpdateGalleryRules').mockImplementationOnce(()=> spyCreateValidateValue);
   jest.spyOn(path,'join').mockImplementationOnce(()=>'../testimage/test.jpg');
   jest.spyOn(fs , 'existsSync').mockImplementationOnce(()=> true);
   const fileRawData:any =  {};
   jest.spyOn(fs, 'readFileSync').mockImplementationOnce(()=> fileRawData);
   user.getSingleUserDetailsFromId = jest.fn().mockResolvedValue({id:1,name:userName,email:userEmail});
   jest.spyOn(galleryCtrl,'writeFileOnEdit');
   await galleryCtrl.update(mReq,mRes);
   await originalCallback(undefined, fields, files);
   expect(form.parse).toHaveBeenCalled();
   expect(updateGalleryValidates.UpdateGalleryRules).toHaveBeenCalled();
   expect(fs.existsSync).toHaveBeenCalled();
   expect(fs.readFileSync).toHaveBeenCalled();
   expect(galleryCtrl.writeFileOnEdit).toHaveBeenCalled();
    });


    it('test writefile on edit',async()=>{
      const user = new UserService;
      const customRes = new CustomResponseHelper;
      const galleryContent = new GalleryService;
      const galleryCtrl = new GalleryController(customRes,galleryContent,user);
      const mRes:mocks.MockRequest<any> = {
        status: jest.fn().mockReturnThis(),
        send:jest.fn(),
        json: jest.fn(),  
      };  
       
      let originalCallback:any;
      jest.spyOn(fs,'writeFile').mockImplementation((directory,rawData,callback) => {
        originalCallback = callback;
      });
      galleryContent.update = jest.fn().mockReturnValueOnce({});
      let galleryEnt:Promise<GalleryEntity> = {} as any;
      let userEnt:Promise<UserEntity> = {} as any;
      customRes.setHttpResponse = jest.fn().mockImplementationOnce(()=>{});
      let deleteFileAfterUpdateOrDeleteMockValue:any = {}
      jest.spyOn(galleryCtrl,'deleteFileAfterUpdateOrDelete').mockImplementation(()=>
       deleteFileAfterUpdateOrDeleteMockValue );
      await galleryCtrl.writeFileOnEdit('',{},mRes,'',{},'1');
      await originalCallback(false);
      expect(galleryCtrl.deleteFileAfterUpdateOrDelete).toHaveBeenCalled();
      expect(customRes.setHttpResponse).toHaveBeenCalled();
      expect(galleryContent.update).toHaveBeenCalled();
    });



    it('updateWithoutNewFile', async()=>{
      const user = new UserService;
      const customRes = new CustomResponseHelper;
      const galleryContent = new GalleryService;
      const galleryCtrl = new GalleryController(customRes,galleryContent,user);
      const mRes:mocks.MockRequest<any> = {
        status: jest.fn().mockReturnThis(),
        send:jest.fn(),
        json: jest.fn(),  
      };  
      const mReq:mocks.MockRequest<any> = {
      params:{
        id:1
      },
      body:{
      title:''
      }
     
      }    
      customRes.setHttpResponse = jest.fn().mockImplementationOnce(()=>{});
      galleryContent.update = jest.fn().mockImplementationOnce(()=>{})
      await galleryCtrl.updateWithoutNewFile(mReq,mRes);
      expect(customRes.setHttpResponse).toHaveBeenCalled();
      expect(galleryContent.update).toHaveBeenCalled();
    });


    it('deleteFileAfterUpdateOrDelete',async()=>
    {
      const user = new UserService;
      const customRes = new CustomResponseHelper;
      const galleryContent = new GalleryService;
      const galleryCtrl = new GalleryController(customRes,galleryContent,user);
      galleryContent.getSingleGallery = jest.fn().mockImplementation(()=>{
        return {image:'test.png'}
      });
      jest.spyOn(path,'join').mockImplementationOnce(()=>'../testimage/test.jpg');
      jest.spyOn(fs , 'existsSync').mockImplementationOnce(()=> true);
      jest.spyOn(fs , 'unlinkSync').mockImplementationOnce(()=> true);
      await galleryCtrl.deleteFileAfterUpdateOrDelete(1);
      expect(path.join).toHaveBeenCalled();
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.unlinkSync).toHaveBeenCalled();

    });


    it('delete',async()=>{
      const user = new UserService;
      const customRes = new CustomResponseHelper;
      const galleryContent = new GalleryService;
      const galleryCtrl = new GalleryController(customRes,galleryContent,user);
      galleryContent.delete = jest.fn().mockImplementationOnce(()=>true);
      let deleteFileAfterUpdateOrDeleteMockValue:any = {}
      jest.spyOn(galleryCtrl,'deleteFileAfterUpdateOrDelete').mockImplementation(()=>
       deleteFileAfterUpdateOrDeleteMockValue);
       customRes.setHttpResponse = jest.fn().mockImplementationOnce(()=>{});
    
       const mRes:mocks.MockRequest<any> = {status: jest.fn().mockReturnThis(),
      send:jest.fn(),
        json: jest.fn(),};  
      const mReq:mocks.MockRequest<any> = {
      params:{
        id:1
      },     
      } 
       await galleryCtrl.delete(mReq,mRes);
       expect(galleryContent.delete).toHaveBeenCalled();
       expect(galleryCtrl.deleteFileAfterUpdateOrDelete).toHaveBeenCalled();
       expect(customRes.setHttpResponse).toHaveBeenCalled();

    });



});