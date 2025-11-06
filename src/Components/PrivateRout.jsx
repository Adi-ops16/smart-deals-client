import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router';

const PrivateRout = ({ children }) => {
    const { user } = use(AuthContext)
    return <>
        {
            user ? children : <Link to='/login'></Link>
        }
    </>


};

export default PrivateRout;