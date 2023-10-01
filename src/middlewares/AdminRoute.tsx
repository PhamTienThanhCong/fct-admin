import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import useLoadData from '../hooks/useLoadData';

function AdminRoute() {
    useLoadData();
    const {isAuthenticated, isFetching} = useAppSelector(store => store.auth);
    const location = useLocation();

    if (isFetching) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={location} />;
}


export default AdminRoute;