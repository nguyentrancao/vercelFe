import React from "react";
import { Route, Routes } from "react-router-dom";
import MainCartPage from "../Pages/cartPage/OrderCheckout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/SignInApp";
import Products from "../Pages/Products/Products";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Payments from "../Pages/payment/Payments";
import { LastPage } from "../Pages/cartPage/LastPage";
import PrivateRoute from "./PrivateRoute/PrivateRoutes";
import AdminRoute from "./PrivateRoute/AdminRoutes";
import Checkout from "../Pages/cartPage/Address";
import MyOrder from "../Pages/Profile/MyOrder";
import MyProfile from "../Pages/Profile/MyProfile";
import Cart from "../Pages/cartPage/Cart";
import Success from "../Pages/checkout/success";
import Dashboard from "../Admin/Components/Pages/Home/Home";
import Quanlynv from "../Admin/Components/Pages/Quanly/Quanlykh";
import Quanlysp from "../Admin/Components/Pages/Quanly/Quanlysp";
import Quanlydonhang from "../Admin/Components/Pages/Quanly/Quanlydonhang";
import Menu from "../Admin/Components/Layout/components/Menu";
import Baocaodoanhthu from "../Admin/Components/Pages/Quanly/Baocaodoanhthu";
import Themsanpham from "../Admin/Components/Pages/Task/Themsanpham";
import ChangePass from "../Pages/Profile/ChangePass";
import Verified from "../Pages/Login/Verified";
import Forgot from "../Pages/Login/Forgot";
import Resetpass from "../Pages/Login/Resetpass";
import NotFoundPage from "../Pages/404";
import Thembienthe from "../Admin/Components/Pages/Task/Thembienthe";
import BlogContent from "../Pages/blog/blogcontent";
import BlogList from "../Pages/blog/bloglist";
import  Editsp  from "../Admin/Components/Pages/Task/Editsp";
const productTypes = [
  "laptop",
  "phone",
  "tablet",
  "iphone",
  "samsung/phone",
  "samsung/tablet",
  "xiaomi",
  "samsung",
  "oppo",
  "hp",
  "asus",
  "lenovo",
  "acer",
  "cable",
  "Battery",
  "LoudSpeaker",
  "mouse",
  "keyboard",
  "smartwatch",
  "EarPhone",
];

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/blog" element={<BlogList />}></Route>
        <Route path="/blog/:id" element={<BlogContent />}></Route>
        <Route path="/404" element={<NotFoundPage />}></Route>
        <Route path="/resetpass" element={<Resetpass />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/verify" element={<Verified />}></Route>
        <Route path="/reset" element={<ChangePass />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
              path={`/apple/phone`}
              element={<Products typeOfProduct={"apple/phone"} />}
            ></Route>
       
        <Route
              path={`/apple/tablet`}
              element={<Products typeOfProduct={"apple/tablet"} />}
            ></Route>
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Menu />
              <Dashboard />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/themsp"
          element={
            <AdminRoute>
              <Menu />
              <Themsanpham />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/thembienthe"
          element={
            <AdminRoute>
              <Menu />
              <Thembienthe />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/editsp/:id"
          element={
            <AdminRoute>
              <Menu />
              <Editsp />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/Quanlykh"
          element={
            <AdminRoute>
              <Menu />
              <Quanlynv />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/Quanlysp"
          element={
            <AdminRoute>
              <Menu />
              <Quanlysp />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/Quanlydonhang"
          element={
            <AdminRoute>
              <Menu />
              <Quanlydonhang />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/Themsanpham"
          element={
            <AdminRoute>
              <Menu />
              <Themsanpham />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/doanhthu"
          element={
            <AdminRoute>
              <Menu />
              <Baocaodoanhthu />
            </AdminRoute>
          }
        ></Route>
        {productTypes.map((type) => (
          <React.Fragment key={type}>
            <Route
              path={`/${type}`}
              element={<Products typeOfProduct={type} />}
            ></Route>
            <Route
              path={`/${type}/:id`}
              element={<SingleProduct typeOfProduct={type} />}
            ></Route>
          </React.Fragment>
        ))}
        <Route path={`/:id`} element={<SingleProduct />}></Route>
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <MainCartPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/myorder"
          element={
            <PrivateRoute>
              <MyOrder />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/myprofile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/lastpage"
          element={
            <PrivateRoute>
              <LastPage />
            </PrivateRoute>
          }
        ></Route>
  
      </Routes>
    </div>
  );
};

export default AllRoutes;
