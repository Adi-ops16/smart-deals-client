import { Search } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <div className='flex flex-col items-center space-y-5 py-20 bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]'>
            <h1 className='text-7xl font-bold'>Deal your <span className='text-primary'>Products </span>
                in a <span className='text-primary'>Smart</span> way !</h1>
            <p className='text-secondary'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <div className="join w-xl flex justify-center">
                <input className="input join-item border-none rounded-l-xl focus:outline-0 shadow-2xl" placeholder="Email" />
                <button className="btn join-item rounded-r-full bg-primary"><Search color='white'></Search></button>
            </div>
            <div className='flex gap-5'>
                <button className='btn btn-primary'>Watch All Products</button>
                <button className='btn text-primary border border-primary'>Post an Product</button>
            </div>
        </div>
    );
};

export default Header;