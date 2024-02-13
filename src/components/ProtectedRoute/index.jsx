import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export const RequireAuth = () => {
    let auth = useAuth();   
    let location = useLocation();
    
    // console.log('auth:', auth);

    if (!auth.currentUser) { 
        return <Navigate to="/login" state={{ from: location }}/>;
    }
    return (
        <Outlet />
    );
};
