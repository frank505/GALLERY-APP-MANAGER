import router from '../../routes/auth';

describe('has routes', ()=>{

  it('has routes', ()=>{
    const routes = [
      { path: '/login', method: 'post' },
      { path: '/register', method: 'post' },
    ]
  
    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  })

})

