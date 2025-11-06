import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const CreateProduct = () => {
    const { user } = useAuth()
    // const axiosInstance = useAxios()
    const axiosSecure = useAxiosSecure()

    const handleAddProduct = (e) => {
        e.preventDefault()
        const title = e.target.productName.value
        const productImg = e.target.productURL.value
        const min_price = e.target.min_price.value
        const max_price = e.target.max_price.value

        const newProduct = {
            title,
            productImg,
            min_price,
            max_price,
            email: user.email,
            seller_name: user.displayName
        }

        axiosSecure.post('/products', newProduct)
            .then(data => {
                console.log(data)
                if (data.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations",
                        text: "Your product has been created",
                        timer: 2000
                    })
                    e.target.reset()
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleAddProduct} className='max-w-11/12 mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-200px)]'>
                <fieldset className="fieldset w-86 border border-gray-100 rounded-sm shadow-2xl p-5">
                    <h2 className='text-2xl font-bold text-primary mb-3'>Add your product</h2>
                    {/* title */}
                    <label className="label">Product Name</label>
                    <input type="text"
                        name='productName'
                        className="input" placeholder="product name" />
                    {/* product url */}
                    <label className="label">Product picture</label>
                    <input type="text"
                        name='productURL'
                        className="input"
                        placeholder="product image" />
                    {/* bid amount */}
                    <label className="label">Minimum price</label>
                    <input type="number" className="input"
                        name='min_price' placeholder="minimum price" />
                    <label className="label">Maximum price</label>
                    <input type="number" className="input"
                        name='max_price' placeholder="maximum price" />
                    <button className="btn btn-primary mt-4">Add a product</button>
                </fieldset>
            </form>
        </div>
    );
};

export default CreateProduct;