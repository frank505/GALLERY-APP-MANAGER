import { validateObject, useFormFields } from "./helperFunc";
import { renderHook, act } from '@testing-library/react-hooks'  



describe('Name of the group', () => {
   
    it('button is set to disable', ()=>
    {
        const data = {
            name:'',
            email:''
        }
       let disableRes = validateObject(data);
       expect(disableRes).toBe(true);  
      
    });

  it('test useformfields',()=>{

const {result } = renderHook(()=> useFormFields({name:'desmond',email:''}))
 expect(result.current[0].name).toBe('desmond');
  })

    
});