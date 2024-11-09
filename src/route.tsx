/** @format */

import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import {
  DefaultLayout,
  AdminLayout,
  AdminOverview,
  VistitorLayout,
  AdminProfile,
} from "./component";
import {
  HomePage,
  OrdersAdmin,
  PostsAdmin,
  ProductsAdmin,
  Product,
  Post,
  Register,
  ForgotPassword,
  Description,
  DetailProduct,
  Login, DeliveryAdmin ,PendingOrdersAdmin
} from "./page";
import { Navigate } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DefaultLayout></DefaultLayout>
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/product",
        element: <Product></Product>,
      },
      {
        path: "/posts",
        element: <Post></Post>,
      },
      {
        path: "/description",
        element: <Description></Description>,
      },
      {
        path: "/product/:id",
        element: <DetailProduct></DetailProduct>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/overview"></Navigate>,
      },
      {
        path: "/admin/overview",
        element: <AdminOverview></AdminOverview>,
      },
      {
        path: "/admin/profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/admin/products",
        element: <ProductsAdmin></ProductsAdmin>,
      },
      {
        path: "/admin/orders",
        element: <OrdersAdmin></OrdersAdmin>,
      },
      {
        path: "/admin/posts",
        element: <PostsAdmin></PostsAdmin>,
      },
      {
        path: "/admin/orders/pending",
        element: <PendingOrdersAdmin></PendingOrdersAdmin>,
      },
      {
        path: "/admin/orders/delivery",
        element: <DeliveryAdmin></DeliveryAdmin>,
      },
    ],
  },
  {
    path: "/",
    element: <VistitorLayout></VistitorLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);
export default router;
