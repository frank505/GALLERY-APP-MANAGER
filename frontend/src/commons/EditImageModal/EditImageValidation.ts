import { validateObject } from "../../helpers/helperFunc";

export const validate = (values:any):any =>
{

console.log(values); 


const extension:Array<any> = ['png','jpeg','jpg','gif'];
const fileExt:string = values.filename.split('.').pop('.');



 const errors:any = {};
  
 errors.title =  values.title == ''? 'Title Field is Required': '';
 errors.filename = values.filename == ''? 'File is required':'';
 errors.filename = !extension.includes(fileExt.toLowerCase()) ? 
 'File uploaded must be a png,jpeg,jpg or png':'';

 const validateObj = validateObject(errors);

 return validateObj == false? true: errors;

}