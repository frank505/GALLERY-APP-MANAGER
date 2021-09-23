import { validateObject, useFormFields, SwalAlert } from "./helperFunc";
import { renderHook, act } from '@testing-library/react-hooks'  
import { waitFor } from "@testing-library/dom";
import * as swal from 'sweetalert2';




jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))




describe('Name of the group', () => {
   
    it('button is set to disable', ()=>
    {
        const data = 
        {
            name:"",
            email:""
        }

      let disableRes = validateObject(data);
      console.log(disableRes);
      // expect(disableRes).toBe(false);  

    });

  it('test useformfields',()=>
  {
 const {result} = renderHook(()=> useFormFields({name:'desmond',email:''}));
 expect(result.current[0].name).toBe('desmond');
  });

  it('calls swal alert ', async()=>
  {
    SwalAlert("dd",'ddd','ddd');
    expect(swal.default.fire).toHaveBeenCalled();
  });

    
});