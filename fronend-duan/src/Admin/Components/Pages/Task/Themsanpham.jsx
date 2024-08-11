import React, { useState, useEffect } from "react";
import "./Themsp.css";
import axios from "axios";
import {
  Box,
  Image,
  Center,
  Flex,
  AspectRatio,
  Button,
  Text,
} from "@chakra-ui/react";

const Themsanpham = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prodTypes, setProdTypes] = useState([]);
  const [prodcatID, setProdcatID] = useState([]);
  const [catName, setCatName] = useState([]);
  const [colors, setColors] = useState([]);
  const [storage, setStorage] = useState([]);
  const [product, setProduct] = useState({
    prodName: "",
    prodType: "",
    prodImg: "",
    prodcatID: "",
    prodPrice: "",
    prodSale: "",
    prodDesc: "",
    QTY: "",
  });
  const [variant, setVariant] = useState({
    colorID: "",
    storageID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "prodcatID") {
      const selectedCatName = categories.find(
        (category) => category.prodcatID === parseInt(value, 10),
      )?.catName;
      setCatName(selectedCatName || ""); // Set an empty string if no matching category is found
    }

    setProduct({
      ...product,
      [name]: value,
    });
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  const fetchColors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/color`,
      );
      setColors(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchStorage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/storage`,
      );
      setStorage(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/category/catID`,
      );
      setCategories(response.data);
      const uniqueProdcatID = Array.from(
        new Set(response.data.map((product) => product.prodcatID)),
      );
      setProdcatID(uniqueProdcatID);
      //get catName base on prodcatID
      const catName = response.data.map((product) => product.catName);
      setCatName(catName);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/products`,
      );
      setProducts(response.data);

      const uniqueProdTypes = Array.from(
        new Set(response.data.map((product) => product.prodType)),
      );
      setProdTypes(uniqueProdTypes);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleAddProduct = async () => {
    // Tính giá trước khi giảm dựa trên giá bán và phần trăm giảm giá
    const price = parseFloat(product.prodPrice);
    try {
      // Sau khi tính giá trước khi giảm, gửi yêu cầu POST với dữ liệu sản phẩm
      await axios.post(
        `${process.env.REACT_APP_DATABASE_API_URL}/products`,
        product,
      );
      alert("Product added successfully");
      // Reset the form after successful submission
      setProduct({
        prodName: "",
        prodType: "",
        prodcatID: "",
        prodImg: "",
        prodPrice: 0,
        prodSale: 0,
        prodDesc: "",
        QTY: 0,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const editProduct = async (prodID) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_DATABASE_API_URL}/products/${prodID}`,
      );
      alert("Product edited successfully");
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error editing product:", error);
      alert("Failed to edit product. Please try again.");
    }
  };
  return (
    <body className="app sidebar-mini rtl">
      {/* <!-- Sidebar menu--> */}
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>

      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/quanlysp">Danh sách sản phẩm</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới sản phẩm</h3>
              <div className="tile-body">
                <div className="row element-button">
                  <Box width="100%" display="flex" padding="0 0 0 18px">
                    <div className="col-sm-2">
                      <a
                        className="btn btn-add btn-sm"
                        data-toggle="modal"
                        data-target="#adddanhmuc"
                        href="/admin/thembienthe"
                      >
                        <i className="fas fa-folder-plus"></i> Thêm biến thể
                      </a>
                    </div>
                  </Box>
                </div>

                <form className="row" />

                <div className="form-group col-md-6">
                  <label className="control-label">Tên sản phẩm </label>
                  <input
                    className="form-control"
                    placeholder="Tên sản phẩm"
                    type="text"
                    name="prodName"
                    value={product.prodName}
                    onChange={handleChange}
                  />
                </div>

                {/* tên sp */}

                <Box width="100%" display="flex">
                  <div className="form-group  col-md-2">
                    <label className="control-label">Số lượng</label>
                    <input
                      placeholder="0"
                      className="form-control"
                      type="number"
                      name="QTY"
                      value={product.QTY}
                      onChange={handleChange}
                    />
                  </div>
                  {/* số lượng */}

                  <div className="form-group  col-md-2">
                    <label className="control-label">Giá bán</label>
                    <input
                      placeholder="0"
                      className="form-control"
                      type="number"
                      name="prodPrice"
                      value={product.prodPrice}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Giá bán */}

                  <div className="form-group  col-md-2">
                    <label className="control-label">Phần trăm giảm giá</label>
                    <input
                      placeholder="0"
                      className="form-control"
                      type="number"
                      name="prodSale"
                      value={product.prodSale}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Phần trăm giảm giá */}

                  {/* Hãng */}
                </Box>
                <Box width="100%" display="flex">
                  <div className="form-group col-md-3 ">
                    <label for="exampleSelect1" className="control-label">
                      Loại sản phẩm
                    </label>
                    <select
                      className="form-control"
                      id="exampleSelect1"
                      name="prodType"
                      value={product.prodType}
                      onChange={handleChange}
                    >
                      <option value="all">Loại</option>
                      {prodTypes.map((prodType) => (
                        <option key={prodType} value={prodType}>
                          {prodType}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Loại sản phẩm */}

                  <div className="form-group col-md-3 ">
                    <label for="exampleSelect1" className="control-label">
                      Hãng
                    </label>
                    <select
                      className="form-control"
                      id="exampleSelect1"
                      name="prodcatID"
                      value={product.prodcatID}
                      onChange={handleChange}
                    >
                      <option value="all">Hãng</option>
                      {categories.map((category) => (
                        <option
                          key={category.prodcatID}
                          value={category.prodcatID}
                        >
                          {category.catName}
                        </option>
                      ))}
                    </select>
                  </div>
                </Box>

                <div className="form-group col-md-6">
                  <label className="control-label">Ảnh sản phẩm </label>
                  <input
                    className="form-control"
                    placeholder="Vui lòng dán link hình ảnh sản phẩm"
                    type="text"
                    name="prodImg"
                    value={product.prodImg}
                    onChange={handleChange}
                  />
                  {product.prodImg && (
                    <img
                      src={product.prodImg}
                      alt="Product"
                      style={{ width: "200px", height: "auto", margin: "20px" }}
                    />
                  )}
                </div>

                <div className="form-group col-md-6">
                  <label className="control-label">Mô tả sản phẩm</label>
                  <textarea
                    placeholder="Thêm mô tả..."
                    className="form-control"
                    id="mota"
                    name="prodDesc"
                    value={product.prodDesc}
                    onChange={handleChange}
                  ></textarea>
                  <script>CKEDITOR.replace('mota');</script>
                </div>
                {/* Mô tả */}
              </div>

              <Box
                width="50%"
                display="flex"
                justifyContent="space-around"
                padding="10px"
              >
                <Button
                  padding="10px"
                  w="49%"
                  h="auto"
                  color="#fff"
                  borderRadius="10px"
                  backgroundColor="red"
                  _hover={{ color: "red", backgroundColor: "#fff" }}
                  border="1px solid red"
                  className=" btn-save"
                  type="button"
                  onClick={handleAddProduct}
                >
                  Thêm sản phẩm
                </Button>

                <a
                  style={{ width: "49%", backgroundColor: "#fff" }}
                  className=" btn-cancel"
                  href=""
                >
                  <Box
                    padding="8px"
                    textAlign="center"
                    w="100%"
                    h="auto"
                    color="#fff"
                    border="1px solid red"
                    borderRadius="10px"
                    backgroundColor="red"
                    _hover={{ color: "red", backgroundColor: "#fff" }}
                  >
                    Hủy Bỏ
                  </Box>
                </a>
              </Box>
            </div>
          </div>
        </div>
      </main>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row"></div>
              <br />
              <button
                className="btn btn-save"
                type="button"
                onClick={handleAddProduct}
              >
                Lưu lại
              </button>
              <a className="btn btn-cancel" data-dismiss="modal" href="#">
                Hủy bỏ
              </a>
              <br />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="adddanhmuc"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan">
                    <h5>Thêm mới danh mục </h5>
                  </span>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Nhập tên danh mục mới</label>
                  <input className="form-control" type="text" required />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">
                    Danh mục sản phẩm hiện đang có
                  </label>
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>Apple</li>
                    <li>Oppo</li>
                    <li>Samsung</li>
                    <li>Xiaomi</li>
                  </ul>
                </div>
              </div>
              <br />
              <button
                className="btn btn-save"
                type="button"
                onClick={handleAddProduct}
              >
                Lưu lại
              </button>
              <a className="btn btn-cancel" data-dismiss="modal" href="#">
                Hủy bỏ
              </a>
              <br />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addtinhtrang"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan">
                    <h5>Thêm mới tình trạng</h5>
                  </span>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Nhập tình trạng mới</label>
                  <input className="form-control" type="text" required />
                </div>
              </div>
              <br />
              <button
                className="btn btn-save"
                type="button"
                onClick={handleAddProduct}
              >
                Lưu lại
              </button>
              <a className="btn btn-cancel" data-dismiss="modal" href="#">
                Hủy bỏ
              </a>
              <br />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Themsanpham;
