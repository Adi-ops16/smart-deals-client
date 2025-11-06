import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import PrivateRout from "../Components/PrivateRout";
import ProductDetails from "../Pages/ProductDetails";
import CreateProduct from "../Pages/CreateProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: 'all-products', Component: AllProducts },
            { path: 'register', Component: Register },
            { path: 'login', Component: Login },
            {
                path: 'my-products',
                element: <PrivateRout>
                    <MyProducts></MyProducts>
                </PrivateRout>
            },
            {
                path: 'my-bids',
                element: <PrivateRout>
                    <MyBids></MyBids>
                </PrivateRout>
            },
            {
                path: 'product-details/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
                element:
                    <PrivateRout>
                        <ProductDetails></ProductDetails>
                    </PrivateRout>
            },
            {
                path: "create-product",
                element:
                    <PrivateRout>
                        <CreateProduct></CreateProduct>
                    </PrivateRout>
            }
        ]
    }
])