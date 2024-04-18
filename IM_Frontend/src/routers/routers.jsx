/* eslint-disable no-unused-vars */
import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import AddProductPage from "../addProductPage/AddProductPage";
import AboutPage from "../components/AboutPage";
import ManageProductPage from "../manageProductPage/ManageProductPage";
import AllProductsPage from "../allProductsPage/AllProductsPage";
import SignUpPage from "../signUpPage/SignUpPage";
import SignInPage from "../signInPage/SignInPage";
import SingleProduct from "../shop/SingleProduct";
import Shop from "../shop/Shop";
import EditProduct from "../manageProductPage/EditProduct";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: '/',
            element: <Home/>,
        },

        {
            path: "/addProductPage",
            element: <AddProductPage/>,
        },
        {
            path: "/AboutPage",
            element: <AboutPage/>,
        },
        {
            path: "/manageProductPage",
            element: <ManageProductPage/>,
        },
        {
            path: "/AllProductsPage",
            element: <AllProductsPage/>,
        },
        {
            path: "/SignUpPage",
            element: <SignUpPage/>,
        },
        {
            path: "/SignInPage",
            element: <SignInPage/>,
        },
        {
          path:"/get-item/:id",
          element:<SingleProduct/>,
          loader: ({params}) => fetch(`http://localhost:9000/get-item/${params.id}`),
        },
  
        {
            path: "/shop",
            element: <Shop/>,
        },
        {
          path:"/update-item/:id",
          element: <EditProduct/>,
          loader: ({params}) => fetch(`http://localhost:9000/get-item/${params.id}`),
        },
        
      ]
    },
    
  ]);

  export default router;