import React from 'react';
import LatestProducts from '../Components/LatestProducts';
import Header from '../Components/Header';
const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())
const Home = () => {
    return (
        <div>
            <Header></Header>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;