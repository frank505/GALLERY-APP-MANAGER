import { validateObject } from "../../../helpers/helperFunc";

export const validate = (values:any):any =>
{
 const errors:any = {};
errors.name = values.name==''?'Name Field is Required':'';
errors.email =  values.email==''? 'Email Field is Required': '';
 errors.email = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)?'Invalid email address':'';
 errors.password =  values.password == ''? 'Password Field is Required': '';
 
 const validateObj = validateObject(errors);

 return validateObj == false? true: errors;

}