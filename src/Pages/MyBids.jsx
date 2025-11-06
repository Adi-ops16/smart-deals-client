import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MyBids = () => {
    const { user } = use(AuthContext)
    const [bids, setBids] = useState([])

    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/bids?email=${user.email}`)
            .then(data => setBids(data.data))
    }, [axiosSecure, user])

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 setBids(data)
    //             })
    //     }
    // }, [user.accessToken, user.email])

    const handleDeleteBid = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/bids/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const remainingBids = bids.filter(bid => bid._id !== id)
                            setBids(remainingBids)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Bid has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }

    return (
        <div>
            <h3 className='text-4xl font-bold'>My Bids: <span className='text-primary'>{bids.length}</span></h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>product</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, i) => <tr key={bid._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Yancy Tear</div>
                                            <div className="text-sm opacity-50">Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Yancy Tear</div>
                                            <div className="text-sm opacity-50">Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{bid.bid_price}</td>
                                <td>
                                    <div className="badge badge-warning">{bid.status}</div>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline btn-xs">Remove bid</button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;