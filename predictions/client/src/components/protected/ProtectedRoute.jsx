import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // check if userContext is empty if yes => Homepage
    useEffect(() => {
        if (!user || Object.keys(user).length === 0) {
            navigate('/');
        }
    }, [user, navigate]);

    // if there is user take to children component if not null
    return user && Object.keys(user).length > 0 ? children : null;
}
