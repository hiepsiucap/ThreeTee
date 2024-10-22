/** @format */

import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import {
  DefaultLayout,
  AdminLayout,
  AdminOverview,
  AdminProfile,
} from "./component";
import {
  HomePage,
  OrdersAdmin,
  PostsAdmin,
  ProductsAdmin,
  Product,
  Post,
  Description,
  DetailProduct,
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
    ],
  },
]);
export default router;
