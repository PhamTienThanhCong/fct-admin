import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getDataUser } from '../modules/auth/api';

// get Data User
// get Data User
export default function useLoadData(): void {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(store => store.auth.isAuthenticated);

    React.useEffect(() => {
        const fetchDataUser = async () => {
            if (!isAuthenticated) {
                await dispatch(getDataUser());
            }
        };

        fetchDataUser();
    }, [isAuthenticated, dispatch]);
}
