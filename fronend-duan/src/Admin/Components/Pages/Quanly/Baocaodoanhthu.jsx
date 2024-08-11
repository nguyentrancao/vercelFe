import React from "react";
import "./Quanly.css";
import { useState, useEffect } from "react";
import {
  fetchTotalProducts,
  fetchProducts,
  fetchUsers,
  fetchOrders,
  fetchProductQuantity,
} from "../Quanly/api";
const Baocaodoanhthu = () => {
  const [products, setProducts] = useState([]);
  const [totalproducts, setTotalProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allProduct, setallProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTotalProducts(await fetchTotalProducts());
        setProducts(await fetchProducts());
        setUsers(await fetchUsers());
        setOrders(await fetchOrders());
        setallProduct(await fetchProductQuantity());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Gọi hàm fetchProducts khi component được render

  // Đếm số phần tử trong mảng products
  const productCount = totalproducts.length;
  const orderCount = orders.length;
  // Đếm số lượng sản phẩm còn lại trong kho
  const lowStock = allProduct.filter((product) => product.QTY < 10).length;
  const offStock = allProduct.filter((product) => product.QTY === 0);
  console.log(offStock);
  const orderCanceled = orders.filter(
    (order) => order.orderStatus === "Đã hủy",
  ).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPay, 0);
  const totalByDay = {};

  // Lặp qua mảng orders và tính tổng tiền theo ngày chỉ cho các đơn hàng đã thanh toán và đã giao hàng
  orders.forEach((order) => {
    if (order.orderStatus === "Đã thanh toán" || order.orderStatus === "Đã giao hàng") {
      const date = new Date(order.orderDate).toLocaleDateString("vi-VN");
      if (totalByDay[date]) {
        totalByDay[date] += order.totalPay;
      } else {
        totalByDay[date] = order.totalPay;
      }
    }
  });
  return (
    <body onload="time()" class="app sidebar-mini rtl">
      {/* <!-- Navbar--> */}

      <main class="app-content">
        <div class="row">
          <div class="col-md-12">
            <div class="app-title">
              <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">
                    <b>Báo cáo doanh thu </b>
                  </a>
                </li>
              </ul>
              <div id="clock"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="widget-small info coloured-icon">
              <i class="icon bx bxs-purchase-tag-alt fa-3x"></i>
              <div class="info">
                <h4>Tổng sản phẩm</h4>
                <p>
                  <b>{productCount} sản phẩm</b>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="widget-small warning coloured-icon">
              <i class="icon fa-3x bx bxs-shopping-bag-alt"></i>
              <div class="info">
                <h4>Tổng đơn hàng</h4>
                <p>
                  <b>{orderCount} đơn hàng</b>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="widget-small primary coloured-icon">
              <i class="icon fa-3x bx bxs-chart"></i>
              <div class="info">
                <h4>Tổng thu nhập</h4>
                <p>
                  <b>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalRevenue)}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="widget-small warning coloured-icon">
              <i class="icon fa-3x bx bxs-tag-x"></i>
              <div class="info">
                <h4>Hết hàng</h4>
                <p>
                  <b>{lowStock} sản phẩm</b>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="widget-small danger coloured-icon">
              <i class="icon fa-3x bx bxs-receipt"></i>
              <div class="info">
                <h4>Đơn hàng hủy</h4>
                <p>
                  <b>{orderCanceled} đơn hàng</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="tile">
              <div>
                <h3 class="tile-title">TỔNG ĐƠN HÀNG</h3>
              </div>
              <div class="tile-body">
                <table
                  class="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th>Ngày</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(totalByDay).map(([date, total]) => (
                      <tr key={date}>
                        <td>{date}</td>
                        <td>
                          {total.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <th>Tổng thu nhập:</th>
                      <td>
                        <b>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalRevenue)}
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="tile">
              <div>
                <h3 class="tile-title">SẢN PHẨM ĐÃ HẾT</h3>
              </div>
              <div class="tile-body">
                <table
                  class="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Tình trạng</th>
                      <th>Giảm</th>
                      <th>Giá giảm</th>
                      <th>Giá gốc</th>
                      <th>Danh mục</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offStock.map((product) => (
                      <tr key={product.prodID}>
                        <td>{product.prodID}</td>
                        <td>{product.prodName}</td>
                        <td>
                          {" "}
                          {product.prodImg && (
                            <img
                              src={product.prodImg}
                              alt="Product"
                              style={{
                                width: "100px",
                                height: "auto",
                                marginLeft: "10px",
                              }}
                            />
                          )}
                        </td>

                        <td>
                          {product.QTY > 10 ? (
                            <span className="badge bg-success">Còn hàng</span>
                          ) : product.QTY === 0 ? (
                            <span className="badge bg-danger">Hết hàng</span>
                          ) : (
                            <span className="badge bg-warning">
                              Sắp hết hàng
                            </span>
                          )}
                        </td>
                        <td>{product.prodSale}%</td>
                        <td>
                          {product.prodPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          {product.prodPriceSale.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>{product.catName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

export default Baocaodoanhthu;
