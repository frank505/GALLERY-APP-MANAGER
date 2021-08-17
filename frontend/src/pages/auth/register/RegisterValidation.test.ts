import {validate} from './RegisterValidation';

describe('Name of the group', () => {

it('validates form input', ()=>
{
    const values = {email:'akpufranklin2@gmail.com',password:'password',name:"desmond"}
    const validateRes = validate(values);
    expect(validateRes).toBe(true);
});

it('returns error object',()=>
{
    const values = {email:'',password:'',name:''}
    const validateRes = validate(values);
    expect(validateRes.email).not.toBe('');
    expect(validateRes.password).not.toBe('');
    expect(validateRes.name).not.toBe('');
})
    
});