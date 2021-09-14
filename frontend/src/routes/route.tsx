import Cookies from 'js-cookie';
import React,{useState,useEffect} from 'react'
import { HashRouter as BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../constants';
import { IRoute, routes } from './RouteList';
import AppBar from '../commons/AppBar/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import {AnyAction, Dispatch} from 'redux';
import { RootState } from '../store/Reducers/RootReducer';
import { AppBarHideAction,AppBarShowAction } from '../store/actions/AppBarActions';




const  Routes:React.FunctionComponent = () =>
{

    const appBarState = useSelector((state:RootState) => state.appBar.appBarVisibilityStatus);
    const dispatch:Dispatch<AnyAction> = useDispatch();
   

    useEffect(() => {

        async function appInitLoad()
        {
         let CookieValue = await Cookies.get(JWT_TOKEN_KEY);
         CookieValue==null || CookieValue==undefined || CookieValue==''?
         dispatch(AppBarHideAction())
         :
         dispatch(AppBarShowAction());
        }
        
    
        appInitLoad();

        return () => {
          
        }
    }, []);


 

    return (
        <BrowserRouter >
          {
               appBarState=='hide' ?
               null
               :
               
                <AppBar/>        
           }
           
        <Switch>
           


            {
            routes.map((route:IRoute, index:number|string) => {
                return (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            route.protect==true && !Cookies.get(JWT_TOKEN_KEY) 
                            ?
                            <Redirect to={{ pathname: route?.redirectToIfNotAuthenticated,
                                 state: { from: props.location } }} />
                             :
                             route.protect==true && Cookies.get(JWT_TOKEN_KEY)?
                             <route.component
                                name={route.name} 
                                {...props}
                                {...route.props}
                            />
                            :
                            route.protect==false && Cookies.get(JWT_TOKEN_KEY)?

                            <Redirect to={{ pathname: '/user/gallery-list',
                                state: { from: props.location } }} />
                            :
                            route.protect==false && !Cookies.get(JWT_TOKEN_KEY)?
                            <route.component
                                name={route.name} 
                                {...props}
                                {...route.props}
                            />
                           
                          :
                            null
                        )}
                    />
                );
            })}


        </Switch>
    </BrowserRouter>
    )
}

export default Routes;








