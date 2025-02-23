import {createBrowserRouter} from 'react-router-dom';
import Connection from '../pages/Connection';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Error from '../pages/Error';
import Home from '../pages/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/sign-in',
        element: <SignIn />
    }, 
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/connection',
        element: <Connection />
    }
]);