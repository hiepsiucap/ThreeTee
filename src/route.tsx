/** @format */

import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import {
  DefaultLayout,
  AdminLayout,
  AdminOverview,
  UserLayout,
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
  Complete,
  Register,
  ForgotPassword,
  CancelAdmin,
  VerificationEmail,
  Description,
  DetailProduct,
  Login,
  CreateProduct,
  CancelPage,
  UpdateProduct,
  DeliveryAdmin,
  PendingOrdersAdmin,
  ResetPassword,
  Cart,
  UserProfile,
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
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/cancel",
        element: <CancelPage></CancelPage>,
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
      {
        path: "/admin/orders/cancel",
        element: <CancelAdmin></CancelAdmin>,
      },
      {
        path: "/admin/orders/complete",
        element: <Complete></Complete>,
      },
      {
        path: "/admin/product/create",
        element: <CreateProduct></CreateProduct>,
      },
      {
        path: "/admin/product/update",
        element: <UpdateProduct></UpdateProduct>,
      },
    ],
  },
  {
    path: "/user",
    
    children: [
      {
        path: "/user/",
        element: <Navigate to="/user/profile"></Navigate>,
      },
      {
        path: "/user/profile",
        element: <UserProfile></UserProfile>
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
      {
        path: "/verify-email",
        element: <VerificationEmail></VerificationEmail>,
      },
      {
        path: "/password-reset/:token",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },
]);
export default router;
