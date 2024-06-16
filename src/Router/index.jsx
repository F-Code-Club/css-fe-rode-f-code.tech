import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import ErrorPage from '../Pages/404Page';
import AllAccounts from '../Pages/Accounts/AllAccounts';
import AdminAttendance from '../Pages/AdminManagement/AdminAttendance';
import AdminRoom from '../Pages/AdminManagement/AdminRoom';
import AdminRoomEdit from '../Pages/AdminManagement/AdminRoomEdit';
import AdminRoomView from '../Pages/AdminManagement/AdminRoomView';
import CreateRoom from '../Pages/AdminManagement/CreateRoom';
import Algorithm from '../Pages/Algorithm';
import ArenaCSS from '../Pages/CssBattle';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Upcoming from '../Pages/Upcoming';
import AdminLayoutComponent from '../components/Layout/AdminLayout.component';
import Loading from '../components/Loading';
import PublicLayout from '../components/PublicLayout/UserLayout.component';
import { Resize, useWindowDimensions } from '../components/Resize';
import UserHomeLayout from '../components/UserHomeLayout/UserHomeLayout.component';
import UserLayoutComponent from '../components/UserLayout/UserLayout.component';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import { loaderInfoGG, GetInfoRoomByCode, GetInfoUser } from './RouterLoader/Loader';

const RouterComponent = () => {
    const { width } = useWindowDimensions();
    if (width <= 900) {
        return <Resize />;
    }
    const router = createBrowserRouter([
        { path: '/', element: <Navigate to="home" /> },

        {
            exact: true,
            element: <AdminRoute />,
            children: [
                {
                    exact: true,
                    element: <AdminLayoutComponent />,
                    children: [
                        {
                            exact: true,
                            path: '/admin/*',
                            element: <Upcoming />,
                        },
                        {
                            exact: true,
                            path: '/admin/room',

                            loader: Loading,
                            element: <AdminRoom />,
                        },
                        {
                            exact: true,
                            path: '/admin/room/:id',
                            loader: Loading,
                            element: <AdminRoomView />,
                        },
                        {
                            exact: true,
                            path: '/admin/room/edit/:id',
                            loader: Loading,
                            element: <AdminRoomEdit />,
                        },
                        // {
                        //     exact: true,
                        //     path: 'room/create-room',
                        //     loader: Loading,
                        //     element: <CreateRoom />,
                        // },
                        {
                            exact: true,
                            path: '/contestant',

                            element: <AllAccounts />,
                        },
                        {
                            exact: true,
                            path: '/admin/create',
                            element: <CreateRoom />,
                        },
                        {
                            exact: true,
                            path: '/admin/attendance/:id',
                            element: <AdminAttendance />,
                        },
                    ],
                },
            ],
        },
        {
            exact: true,
            path: '/login',
            element: <Login />,
        },
        {
            exact: true,
            path: '/register',
            loader: loaderInfoGG,
            element: <Register />,
        },
        {
            exact: true,
            path: '/',
            element: <PublicRoute />,
            children: [
                {
                    exact: true,
                    path: 'home',
                    element: <Home />,
                },
                {
                    exact: true,

                    element: <UserLayoutComponent />,
                    children: [
                        {
                            exact: true,
                            path: '/arena_css/:id',
                            loader: GetInfoRoomByCode,
                            element: <ArenaCSS />,
                        },
                        {
                            exact: true,
                            path: '/algorithm/:id',
                            loader: GetInfoRoomByCode,
                            element: <Algorithm />,
                        },
                    ],
                },
            ],
        },

        { path: '*', element: <ErrorPage /> },
    ]);

    return <RouterProvider fallbackElement={<Loading />} router={router} />;
};

export default RouterComponent;
