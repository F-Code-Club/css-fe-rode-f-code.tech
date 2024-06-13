import { Outlet, Navigate, useLoaderData } from 'react-router-dom';

import useAuth from '../utils/useAuth';

const PublicRoute = () => {
    // const { isLoading, userRole } = useAuth();
    // // const { isLoading, userRole } = useLoaderData();
    // if (userRole === undefined) {
    //     return <Navigate to="/login" replace />;
    // } else if (userRole === null) {
    //     return <Outlet />;
    // }
    return <Outlet />;
    return userRole !== '' && userRole !== 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/room" replace />
    );
};

export default PublicRoute;
