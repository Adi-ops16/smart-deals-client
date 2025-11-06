import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const LatestProducts = ({ latestProductsPromise }) => {
    const { user } = use(AuthContext)
    const products = use(latestProductsPromise)
    return (
        <div className='my-10'>
            <h2 className='text-center my-10 text-4xl font-bold'>Recent <span className='text-primary'>Products</span></h2>
            <div className='grid grid-cols-3 gap-5 place-items-center'>
                {
                    products.map(product => {
                        return (
                            <div key={product._id} className="card bg-base-100 w-96 shadow-sm p-2">
                                <figure className="w-full rounded-sm h-64 bg-secondary">
                                    <img
                                        src={product?.image}
                                        className="rounded-xl" />
                                </figure>
                                <div className="mt-5 space-y-2">
                                    <h2 className="card-title">{product?.title} [{product?.usage}]</h2>
                                    <p className='text-primary font-bold'>TK {product?.price_min} - {product?.price_max}</p>
                                    <div className="mt-5">
                                        {
                                            user ? <Link to={`/product-details/${product._id}`} className="btn text-primary border-primary w-full">View Details</Link> : <Link to="/login" className="btn text-primary border-primary w-full">View Details</Link>
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default LatestProducts;