import {validate} from './EditImageValidation';

describe('Name of the group', () => {

it('validates form input', ()=>
{
    const values = {title:'this is the title of the content',filename:'content.png'}
    const validateRes = validate(values);
    expect(validateRes).toBe(true);
});

it('returns error object',()=>
{
    const values = {title:'',filename:''}
    const validateRes = validate(values);
    expect(validateRes.title).not.toBe('');
    expect(validateRes.filename).not.toBe('');
})
    
});