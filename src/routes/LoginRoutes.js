import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const PersonalProfile = Loadable(lazy(() => import('../layout/frofile/ProFile')));
const QRCode = Loadable(lazy(() => import('../layout/frofile/Qrcode')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'profile/:member_id',
            element: <PersonalProfile />
        },
        {
            path: 'qrcode/:member_id',
            element: <QRCode />
        }
    ]
};

export default LoginRoutes;
