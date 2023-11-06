import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../config/hooks';
import useLoadData from '../hooks/useLoadData';
import CustomLoading from '../controllers/common/loading/CustomLoading';

function AdminRoute() {
    useLoadData();
    const {isAuthenticated, isFetching} = useAppSelector(store => store.auth);
    const location = useLocation();

    if (isFetching) return <div><CustomLoading/></div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={location} />;
}


export default AdminRoute;