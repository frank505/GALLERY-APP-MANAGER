import router from '../../routes/index';

test('has routes', () => {
    const routes = [
      { path: '/auth', method: 'post' },
      { path: '/user', method: 'post' },
    ]
  
    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });