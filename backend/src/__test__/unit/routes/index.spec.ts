import router from '../../../routes/index';
import {Router} from "express";








jest.mock('express', () => ({
  Router: () => ({
    use: jest.fn(),
    post: jest.fn(),
    get:jest.fn(),
    patch:jest.fn(),
    delete:jest.fn()
  }),
}))

describe('has routes', ()=>{

  afterEach(()=>{
    jest.restoreAllMocks();
  })


  it('has routes', async()=>{
    expect(router.use).toHaveBeenCalledTimes(2);
  });

})

