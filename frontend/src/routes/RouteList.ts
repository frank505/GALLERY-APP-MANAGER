import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import GalleryLists from "../pages/users/gallerylists";



export interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
    protect:boolean,
    redirectToIfNotAuthenticated?:string
}







export const routes: IRoute[] = [
    // {
    //     path: '',
    //     name:'Login',
    //     component: Login,
    //     exact:true,
    //     protect:false
    // },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        exact: true,
        protect:false
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        exact: true,
        protect:false
    },
    {
        path:'/user/gallery-list',
        name:'User',
        component:GalleryLists,
        exact:true,
        protect:true,
        redirectToIfNotAuthenticated:'/auth/login'
    }
]


