import { mock } from 'jest-mock-extended';
import Login from '../pages/auth/login';
import {IRoute} from './RouteList';

jest.mock('../pages/auth/login');

describe('Name of the group', () => {
    
test('mock iroute interface' ,()=>
{
    const mock = jest.fn<IRoute, []>(() => {
        return {
            path: '/login',
            name: 'home',
            exact: true,
            component: Login,
            props: {},
            protect:true,
            redirectToIfNotAuthenticated:'/home'
        };
      });

      const routelist = mock();
      expect(routelist.exact).toBe(true);
      expect(routelist.component).toBe(Login);
      expect(routelist.name).toBe('home');
      expect(routelist.props).toStrictEqual({});
      expect(routelist.redirectToIfNotAuthenticated).toBe('/home');
});



});
