import { ChevronLeft, Cross, X } from 'lucide-react';
import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetails = () => {
    const { user } = use(AuthContext)
    const [bids, setBids] = useState([])
    const product = useLoaderData()
    const modalRef = useRef(null)
    const { _id, title, price_min, price_max, email, category, image, status, location, seller_image, seller_name, condition, usage, description } = product || {}
    const handleModalOpen = () => {
        modalRef.current.showModal()
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/products/bids/${_id}`)
            .then(data => {
                console.log("after axios get", data)
                setBids(data.data)
            })
    }, [_id])

    // useEffect(() => {
    //     fetch(`http://localhost:3000/products/bids/${_id}`, {
    //         headers: {
    //             authorization: `Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setBids(data)
    //         })
    // }, [_id, user])

    const handleBidding = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const name = e.target.name.value;
        const bid = parseInt(e.target.bid.value);
        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status,
        }

        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    modalRef.current.close()
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations",
                        text: "Your bid has been placed",
                        timer: 2000
                    })
                    // add new bid to the state
                    newBid._id = data.insertedId
                    const newBids = [...bids, newBid]
                    newBids.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBids)
                    e.target.reset()
                }

            })
    }


    return (
        <div>
            {/* product info */}
            <div className='flex p-20 gap-10 bg-[#d9d9d951]'>
                <div className='w-1/2'>
                    <figure className='w-full h-80 bg-gray-300'>
                        <img src={image} alt="" />
                    </figure>
                    <h1>Product Description</h1>
                    <div className='flex justify-between border-b pb-2'>
                        <p><span className='text-primary'>Condition</span>: {condition}</p>
                        <p><span className='text-primary'>Usage Time</span>: {usage}</p>
                    </div>
                    <p className='text-secondary'>{description}</p>
                </div>
                <div className='w-1/2'>
                    <span className='flex items-center gap-2'><ChevronLeft></ChevronLeft>Back to products</span>
                    <div>
                        <h1 className='text-4xl font-bold'>{title}</h1>
                        <div className='p-1 rounded-xl'>
                            <p className='text-primary'>{category}</p>
                        </div>
                        <div className='space-y-3'>
                            <div className='bg-white py-4 rounded-lg pl-4'>
                                <h2 className='text-green-500 text-xl font-bold'>TK {price_min} - {price_max}</h2>
                                <p>Price starts from</p>
                            </div>
                            <div className='bg-white py-4 rounded-lg pl-4'>
                                <h2 className='text-xl font-bold'>Product details</h2>
                                <p>Product ID:  {_id}</p>
                            </div>
                            <div className='bg-white py-4 rounded-lg pl-4 space-y-2'>
                                <h2 className='text-xl font-bold'>Seller information</h2>
                                <div className='flex gap-5'>
                                    <img className='w-14 h-14 rounded-full' src={seller_image} alt="" />
                                    <div>
                                        <h1>{seller_name}</h1>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <p>Location: {location}</p>
                                <p>status: {status}</p>
                            </div>
                        </div>
                        <button onClick={handleModalOpen} className='btn btn-primary w-full mt-5'>I want to buy this product</button>
                        {/*modal */}
                        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Give the best offer!</h3>
                                <p className="py-4">so seller can't resist</p>
                                <form onSubmit={handleBidding}>
                                    <fieldset className="fieldset">
                                        <div className='flex gap-1'>
                                            <div>
                                                <label className="label">Buyer Name</label>
                                                <input type="text"
                                                    readOnly
                                                    defaultValue={user?.displayName}
                                                    name='name'
                                                    className="input" placeholder="your name" />
                                            </div>
                                            <div>
                                                <label className="label">Buyer URL</label>
                                                <input type="text"
                                                    className="input" placeholder="your image" />
                                            </div>
                                        </div>
                                        <label className="label">email</label>
                                        <input type="email" className="input"
                                            name='email'
                                            readOnly
                                            defaultValue={user?.email} placeholder="your email" />
                                        <label className="label">Bid</label>
                                        <input type="number" className="input"
                                            name='bid' placeholder="your Bid" />
                                        <button className="btn btn-primary mt-4">Submit Bid</button>
                                    </fieldset>
                                </form>
                                <div className='flex justify-end mt-2'>
                                    <button onClick={() => modalRef.current.close()} className='btn w-12'><X></X></button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            {/* bids for this product */}
            <div>
                <h3 className='text-3xl font-bold px-4'>Bids for this product: <span className='text-primary'>{bids.length}</span></h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Sl No.
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={bid.buyer_image} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;