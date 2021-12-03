import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// lazy load all the views


const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const AdminDashboard = React.lazy(() => import('../pages/Dashboard'));
const PrescriptionRoute = React.lazy(() => import('../pages/Prescription'));
const Customer = React.lazy(() => import('../pages/Customers'));



const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
        
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
  
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
       
                return <Redirect to={{ pathname: '/' }} />;
            }

       
            return <Component {...props} />;
        }}
    />
);


const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};


const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    route: PrivateRoute,
    icon: 'uil-home',
    component: AdminDashboard,
    header: 'Navigation',
};

const prescriptionRoutes = {
    path: '/prescription',
    name: 'Prescription',
    route: PrivateRoute,
    icon: 'uil-clipboard-alt',
    component: PrescriptionRoute,
    header: 'Management',
};
const customerRoutes = {
    path: '/customers',
    name: 'Customers',
    route: PrivateRoute,
  
    icon: 'uil-user',
    component: Customer,
};
const appRoutes = [
    prescriptionRoutes,
    customerRoutes,
   
];



const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        
    ],
};



const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};


const allRoutes = [rootRoute, dashboardRoutes, ...appRoutes, authRoutes,];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes,];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, authProtectedRoutes, allFlattenRoutes };
