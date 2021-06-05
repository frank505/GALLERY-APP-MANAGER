import { PaginationHelper,SkipPosition } from "../../helpers/PaginationHelper";


describe('test paginate helper', () => 
{

    it('should return correct skip option', async () => {
      const response = SkipPosition(2,8);
      expect(response).toEqual(9);      
    })
  
    it('should return paginate content',()=>
    {
        const paginationHelper = PaginationHelper(105,10,2,{});
        expect(paginationHelper).toEqual({
          first_page: 1,
    last_page: 11,
    total: 105,
    per_page: 10,
    current_page: 2,
    data: {}
        });
    })
    
  })