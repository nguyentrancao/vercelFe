import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box } from "@chakra-ui/react";

const Quanlydonhang = () => {
  const [products, setProducts] = useState([]);

  const [selectedOrderCode, setSelectedOrderCode] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchOrderID, setSearchOrderID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    // Filter products based on selectedOrderStatus, searchTerm, searchDate, and searchOrderID
    const filtered = products.filter(
      (product) =>
        (selectedOrderStatus
          ? product.orderStatus === selectedOrderStatus
          : true) &&
        (searchTerm
          ? product.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
          : true) &&
        (searchDate
          ? new Date(product.orderDate).toISOString().split("T")[0] ===
            searchDate
          : true) &&
        (searchOrderID
          ? product.infoID.toString().includes(searchOrderID)
          : true),
    );
    setFilteredProducts(filtered);
  }, [selectedOrderStatus, searchTerm, searchDate, searchOrderID, products]);

  // ... (existing code)

  const handleFilterChange = (status) => {
    setSelectedOrderStatus(status);
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/orders/`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateOrderStatus = async (infoID, status) => {
    try {
      // Send a PUT request to update the order status
      await axios.put(
        `${process.env.REACT_APP_DATABASE_API_URL}/orders/update-order/${infoID}`,
        {
          status: status,
        },
      );

      // Refresh the products list after updating
      fetchProducts();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  useEffect(() => {
    // Filter products based on selectedOrderStatus and searchTerm
    const filtered = products.filter(
      (product) =>
        (selectedOrderStatus
          ? product.orderStatus === selectedOrderStatus
          : true) &&
        (searchTerm
          ? product.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
          : true),
    );
    setFilteredProducts(filtered);
  }, [selectedOrderStatus, searchTerm, products]);

  const renderProducts = () => {
    const productsByOrderCode = filteredProducts.reduce((acc, product) => {
      if (!acc[product.orderCode]) {
        acc[product.orderCode] = [product];
      } else {
        acc[product.orderCode].push(product);
      }
      return acc;
    }, {});

    const handleOrderCodeClick = (orderCode) => {
      setSelectedOrderCode((prevOrderCode) =>
        prevOrderCode === orderCode ? null : orderCode,
      );
    };

    const formatCurrency = (amount) => {
      // Format the amount as currency, you may want to use a library for this
      // Example: using Intl.NumberFormat
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return formatter.format(amount);
    };
    const processedOrderCodes = new Set();
    const totalExpenditure = Object.values(productsByOrderCode)
      .flat()
      .reduce((total, product) => {
        if (!processedOrderCodes.has(product.orderCode)) {
          processedOrderCodes.add(product.orderCode);
          return total + product.totalPay;
        }
        return total;
      }, 0);

    return (
      <>
        {Object.entries(productsByOrderCode).map(([orderCode, productList]) => (
          <React.Fragment key={orderCode}>
            <tbody>
              <tr
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => handleOrderCodeClick(orderCode)}
              >
                <th>
                  <Text>{productList[0].infoID}</Text>
                </th>
                <th>{orderCode} </th>
                <th>{productList[0].username}</th>
                <th>{productList[0].payment}</th>
                <td style={{ padding: "5px" }}>
                  {new Date(productList[0].orderDate).toLocaleString()}
                </td>
                <th>
                  <Box
                    fontWeight="600"
                    fontSize="15px"
                    ml="1"
                    color="red"
                    _hover={{ color: "red" }}
                  >
                    {formatCurrency(productList[0].totalPay)}
                  </Box>
                </th>

                <th>
                  {productList[0].orderStatus === "Đã xác nhận" ? (
                    <p
                      style={{
                        color: "green",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {productList[0].orderStatus}
                    </p>
                  ) : productList[0].orderStatus === "Đang giao hàng" ? (
                    <p
                      style={{
                        color: "#3268e3",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {productList[0].orderStatus}
                    </p>
                  ) : productList[0].orderStatus === "Đợi xác nhận" ? (
                    <p
                      style={{
                        color: "orange",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {productList[0].orderStatus}
                    </p>
                  ) : productList[0].orderStatus === "Đã hủy" ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {productList[0].orderStatus}
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "green",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {productList[0].orderStatus}
                    </p>
                  )}
                </th>
                <th>
                  {productList[0].orderStatus === "Đợi xác nhận" ? (
                    <Box
                      fontWeight="600"
                      fontSize="15px"
                      ml="1"
                      color="red"
                      _hover={{ color: "red" }}
                    >
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-primary confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(
                            productList[0].infoID,
                            "Đã xác nhận",
                          );
                        }}
                      >
                        Xác nhận
                      </button>
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-danger confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(productList[0].infoID, "Đã hủy");
                        }}
                      >
                        Hủy
                      </button>
                    </Box>
                  ) : productList[0].orderStatus === "Đã xác nhận" ? (
                    <Box
                      fontWeight="600"
                      fontSize="15px"
                      ml="1"
                      color="#e64510"
                    >
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-success confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(
                            productList[0].infoID,
                            "Đang giao hàng",
                          );
                        }}
                      >
                        Giao hàng
                      </button>
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-danger confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(productList[0].infoID, "Đã hủy");
                        }}
                      >
                        Hủy
                      </button>
                    </Box>
                  ) : productList[0].orderStatus === "Đang giao hàng" ? (
                    <Box
                      fontWeight="600"
                      fontSize="15px"
                      ml="1"
                      color="#247bc6"
                    >
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-success confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(
                            productList[0].infoID,
                            "Đã giao hàng",
                          );
                        }}
                      >
                        Đã giao
                      </button>
                      <button
                        style={{ width: "47%", marginRight: "5px" }}
                        type="button"
                        className="btn btn-danger confirm-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(productList[0].infoID, "Đã hủy");
                        }}
                      >
                        Hủy
                      </button>
                    </Box>
                  ) : null}
                </th>
              </tr>
            </tbody>
            {selectedOrderCode === orderCode && (
              <thead>
                <tr style={{ backgroundColor: "#43e5a0", color: "black" }}>
                  <th>ID SP</th>
                  <th colSpan={2} style={{ textAlign: "center" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ textAlign: "center", width: "150px" }}>
                    {" "}
                    Ảnh SP
                  </th>
                  <th style={{ textAlign: "center" }}>Số lượng</th>
                  <th style={{ textAlign: "center" }}>Đơn giá</th>
                </tr>
              </thead>
            )}
            {selectedOrderCode === orderCode &&
              productList.map((product) => (
                <tbody>
                  <tr
                    key={product.prodID}
                    style={{ backgroundColor: "#dfedfa" }}
                  >
                    <td style={{ textAlign: "center" }}>{product.prodID}</td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {product.prodName}
                    </td>
                    <td width="100px">
                      {product.prodImg && (
                        <img
                          src={product.prodImg}
                          alt="Product"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>{product.quantity}</td>
                    <td style={{ textAlign: "center" }}>
                      {formatCurrency(product.prodPrice)}
                    </td>
                  </tr>
                </tbody>
              ))}
            <td></td>
            <tr></tr>
          </React.Fragment>
        ))}
        <tr>
          <td colSpan="10">
            <Text fontWeight="600" fontSize="18px" ml="1" color="green">
              Tổng thu nhập: {formatCurrency(totalExpenditure)}
            </Text>
          </td>
        </tr>
      </>
    );
  };

  return (
    <body onload="time()" class="app sidebar-mini rtl">
      <main class="app-content">
        <div class="app-title">
          <ul class="app-breadcrumb breadcrumb side">
            <li class="breadcrumb-item">
              <a href="#">
                <b>Danh sách đơn hàng</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="tile">
              <div class="tile-body">
                <Text fontSize="25px" fontWeight="500">
                  {" "}
                  Các chức năng tìm kiếm
                </Text>
                <div class="row element-button">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm theo OrderCode"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Tìm kiếm theo  Order Date"
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm theo Order ID"
                      onChange={(e) => setSearchOrderID(e.target.value)}
                    />
                  </div>
                </div>
                <table
                  class="table table-hover table-bordered"
                  id="sampleTable"
                >
                  {" "}
                  <thead>
                    <tr>
                      <th width="6%">
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          ID Đơn
                        </Text>
                      </th>
                      <th>
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          OrderCode
                        </Text>
                      </th>
                      <th>
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          User
                        </Text>
                      </th>
                      <th>
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          Phương thức
                        </Text>
                      </th>
                      <th>
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          Ngày đặt hàng
                        </Text>
                      </th>
                      <th>
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          Số tiền
                        </Text>
                      </th>
                      <th width="10%">
                        <select
                          style={{ border: "1px solid black" }}
                          onChange={(e) => handleFilterChange(e.target.value)}
                        >
                          <option value="">Lọc theo trạng thái</option>
                          <option value="Đợi xác nhận" color="orange">
                            Đợi xác nhận
                          </option>
                          <option value="Đã xác nhận">Đã xác nhận</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Đã giao hàng">Đã giao hàng</option>
                          <option value="Đã thanh toán">Đã thanh toán</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      </th>
                      <th width="18%">
                        <Text
                          fontSize="16px"
                          fontWeight="700"
                          textAlign="center"
                          color="black"
                        >
                          Thao tác
                        </Text>
                      </th>
                    </tr>
                  </thead>
                  {renderProducts()}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

export default Quanlydonhang;
