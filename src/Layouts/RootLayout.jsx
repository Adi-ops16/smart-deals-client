import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const RootLayout = () => {
    return (
        <div>
            <header>
                <div className='max-w-11/12 mx-auto'>
                    <Navbar></Navbar>
                </div>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;