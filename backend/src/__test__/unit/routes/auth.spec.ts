import router from '../../../routes/auth';
import {Router} from "express";








jest.mock('express', () => ({
  Router: () => ({
    post: jest.fn(),
    get:jest.fn()
  }),
}))

describe('has routes', ()=>{

  afterEach(()=>{
    jest.restoreAllMocks();
  })


  it('has routes', async()=>{
    expect(router.post).toHaveBeenCalledTimes(2);
  });

})

