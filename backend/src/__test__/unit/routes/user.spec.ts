import router from '../../../routes/user';
import {Router} from "express";








jest.mock('express', () => ({
  Router: () => ({
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
    expect(router.post).toHaveBeenCalledTimes(1);
    expect(router.get).toHaveBeenCalledTimes(1);
    expect(router.delete).toHaveBeenCalledTimes(1);
    expect(router.patch).toHaveBeenCalledTimes(1);
  });

})

