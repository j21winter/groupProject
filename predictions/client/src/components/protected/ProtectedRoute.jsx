import React, {useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';



export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
    //to check user if its empty from user context
    const {user} = useContext(UserContext)
    // console.log('this is the user: ' + user)
    
    // conditon to check if object is empty
    function isEmpty(obj) {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    
    useEffect(() => {
        // check if user is not present => to Homepage
    if (isEmpty(user)) {
        navigate('/');
    }
    }, [user]);

    return children // If user is present continue with the children component
}
