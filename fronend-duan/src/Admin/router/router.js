import Forgot from "../Components/Pages/Dangnhap/Forgot";
import Dangnhap from "../Components/Pages/Dangnhap/Dangnhap";
import Home from "../Components/Pages/Home/Home";
import Quanlynv from "../Components/Pages/Quanly/Quanlykh";
import Quanlysp from "../Components/Pages/Quanly/Quanlysp";
import Quanlydonhang from "../Components/Pages/Quanly/Quanlydonhang";

import Baocaodoanhthu from "../Components/Pages/Quanly/Baocaodoanhthu";
import Themsanpham from "../Components/Pages/Task/Themsanpham";
import ProductList from "../Components/Pages/test";
import Editsp from "../Components/Pages/Task/Editsp";
const publicRoutes = [
  { path: "/", component: Home },

  { path: "/dangnhap", component: Dangnhap, layout: null },
  { path: "/forgot", component: Forgot, layout: null },
  { path: "/quanlykh", component: Quanlynv, layout: null },
  { path: "/quanlysp", component: Quanlysp, layout: null },
  { path: "/quanlydonhang", component: Quanlydonhang, layout: null },

  { path: "/doanhthu", component: Baocaodoanhthu, layout: null },
  { path: "/themsp", component: Themsanpham, layout: null },
  { path: "/editsp/:proId", component: Editsp, layout: null },
  { path: "/prodlist", component: ProductList, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
