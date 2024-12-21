/** @format */

import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import {
  DefaultLayout,
  AdminLayout,
  AdminOverview,
  UserLayout,
  VistitorLayout,
  AdminProfile,
  UserInfo,
  UserSecurity,
  UserNotification,
  DetailHoodie,
  UserOrder,
} from "./component";
import {
  HomePage,
  OrdersAdmin,
  PostsAdmin,
  ProductsAdmin,
  Product,
  Post,
  Complete,
  UpdateUserAdmin,
  Register,
  ForgotPassword,
  CancelAdmin,
  VerificationEmail,
  Description,
  DetailProduct,
  Login,
  CreateProduct,
  CheckOut,
  CancelPage,
  UserTable,
  UpdateProduct,
  DeliveryAdmin,
  DetailHat,
  DetailShirt,
  PendingOrdersAdmin,
  ResetPassword,
  CouponAdmin,
  Cart,
  AllProductAdmin,
  SuccessPage,
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
        path: "/checkout",
        element: <CheckOut></CheckOut>,
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
        path: "/success",
        element: <SuccessPage></SuccessPage>,
      },
      {
        path: "/product/:id",
        element: <DetailProduct></DetailProduct>,
      },
      {
        path: "/producthoodie",
        element: <DetailHoodie></DetailHoodie>,
      },
      {
        path: "/productshirt",
        element: <DetailShirt></DetailShirt>,
      },
      {
        path: "/producthat",
        element: <DetailHat></DetailHat>,
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
        path: "/admin/coupon",
        element: <CouponAdmin></CouponAdmin>,
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
        path: "/admin/product/delete",
        element: <CancelAdmin></CancelAdmin>,
      },
      {
        path: "/admin/product/update/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/admin/product/allproduct",
        element: <AllProductAdmin></AllProductAdmin>,
      },
      {
        path: "/admin/user/alluser",
        element: <UserTable></UserTable>,
      },
      {
        path: "/admin/user/updatestaff",
        element: <UpdateUserAdmin></UpdateUserAdmin>,
      },
    ],
  },
  {
    path: "/user",
    element: <DefaultLayout></DefaultLayout>,
    children: [
      {
        path: "/user",
        element: <UserLayout></UserLayout>,
        children: [
          {
            path: "/user/",
            element: <Navigate to="/user/profile"></Navigate>,
          },
          {
            path: "/user/profile",
            element: <UserInfo></UserInfo>,
          },
          {
            path: "/user/order",
            element: <UserOrder></UserOrder>,
          },
          {
            path: "/user/notification",
            element: <UserNotification></UserNotification>,
          },
          {
            path: "/user/security",
            element: <UserSecurity></UserSecurity>,
          },
        ],
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
