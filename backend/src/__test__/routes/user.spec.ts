import router from '../../routes/user';

test('has routes', () => {
    const routes = [
      { path: '/create-gallery', method: 'post' },
      { path: '/list-gallery', method: 'get' },
      { path: '/update-gallery/:id', method: 'patch' },
      {path:'/delete/:id([0-9]+)', method:'delete'}
    ]
  
    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });