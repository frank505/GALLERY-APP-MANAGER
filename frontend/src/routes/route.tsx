import Cookies from 'js-cookie';
import React from 'react'
import { HashRouter as BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../constants';
import { IRoute, routes } from './RouteList';



const  Routes:React.FunctionComponent = () =>{
    return (
        <BrowserRouter >
        <Switch>
            {routes.map((route:IRoute, index:number|string) => {
                return (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            route.protect==true && !Cookies.get(JWT_TOKEN_KEY) 
                            ?
                            <Redirect to={{ pathname: route?.redirectToIfNotAuthenticated, state: { from: props.location } }} />
                             :
                            <route.component
                                name={route.name} 
                                {...props}
                                {...route.props}
                            />
                        )}
                    />
                );
            })}
        </Switch>
    </BrowserRouter>
    )
}

export default Routes;








