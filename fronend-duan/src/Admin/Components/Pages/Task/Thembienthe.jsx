import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Center,
  Flex,
  AspectRatio,
  Button,
  Text,
} from "@chakra-ui/react";
import uuid from "react-uuid";

export default function Thembienthe() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [color, setColor] = useState([]);
  const [storage, setStorage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [prodPrice, setProdPrice] = useState(""); // Track product price
  const [prodImg, setProdImg] = useState(""); // Track product image
  const [variants, setVariants] = useState([]);
  const [prodSale, setProdSale] = useState("");
  const fetchProduct = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_API_URL}/products`,
    );
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);
    setSelectedProduct(data.length > 0 ? data[0].prodID : "");
  };

  const fetchColor = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_API_URL}/products/colors`,
    );
    const data = await response.json();
    setColor(data);
    setSelectedColor(data.length > 0 ? data[0].colorID : "");
  };

  const fetchStorage = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_API_URL}/products/storages`,
    );
    const data = await response.json();
    setStorage(data);
    setSelectedStorage(data.length > 0 ? data[0].storageID : "");
  };

  useEffect(() => {
    fetchProduct();
    fetchColor();
    fetchStorage();
  }, []);

  const handleNameSearch = (e) => {
    const name = e.target.value;
    setSearchValue(name);
    const result = products.filter((item) => {
      const lowercaseName = item.prodName.toLowerCase();
      const lowercaseSearch = name.toLowerCase();
      return (
        lowercaseName.includes(lowercaseSearch) ||
        lowercaseSearch.includes(lowercaseName)
      );
    });
    setFilteredProducts(result);
  };

  const handleSelectChange = (e, type) => {
    const value = e.target.value;
    if (type === "product") {
      setSelectedProduct(value);
    } else if (type === "color") {
      setSelectedColor(value);
    } else if (type === "storage") {
      setSelectedStorage(value);
    }
  };

  const handleAddVariant = async (e) => {
    e.preventDefault();

    try {
      // Create a new variant with prodPrice and prodImg
      const variant = {
        prodID: selectedProduct,
        colorID: selectedColor,
        storageID: selectedStorage,
        prodPrice: prodPrice,
        prodImg: prodImg,
      };

      // Send the new variant to the backend
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_API_URL}/products/variants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variant),
        },
      );

      // Check the response status
      if (response.ok) {
        console.log("Variant added successfully");
        // Add the new variant to the local state
        setVariants((prevVariants) => [...prevVariants, variant]);
      } else {
        console.error("Error adding variant");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <main className="app-content">
        <div class="app-title" style={{ marginTop: "45px" }}>
          <ul class="app-breadcrumb breadcrumb side">
            <li class="breadcrumb-item">
              <a href="#">
                <b>Tạo mới biến thể</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới biến thể của sản phẩm</h3>
              <div className="tile-body">
                <div className="row element-button">
                  <Box width="100%" display="flex" padding="0 0 0 18px">
                    <div className="col-sm-2" style={{ marginRight: "10px" }}>
                      <a
                        className="btn btn-add btn-sm"
                        data-toggle="modal"
                        data-target="#adddanhmuc"
                      >
                        <i className="fas fa-folder-plus"></i> Thêm danh mục
                      </a>
                    </div>
                    <div className="col-sm-2" style={{ marginLeft: "10px" }}>
                      <a
                        className="btn btn-add btn-sm"
                        data-toggle="modal"
                        data-target="#addtinhtrang"
                      >
                        <i className="fas fa-folder-plus"></i> Thêm tình trạng
                      </a>
                    </div>
                  </Box>
                </div>

                <form className="row" />

                <form onSubmit={handleAddVariant}>
                  <div className="form-group col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm sản phẩm"
                      value={searchValue}
                      onChange={handleNameSearch}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label for="exampleSelect1" className="control-label">
                      Sản phẩm
                    </label>
                    <select
                      className="form-control "
                      onChange={(e) => handleSelectChange(e, "product")}
                      value={selectedProduct}
                    >
                      {filteredProducts.map((item) => (
                        <option key={uuid()} value={item.prodID}>
                          {item.prodName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label for="exampleSelect1" className="control-label">
                      Màu sắc
                    </label>
                    <select
                      className="form-control "
                      onChange={(e) => handleSelectChange(e, "color")}
                      value={selectedColor}
                    >
                      {color.map((item) => (
                        <option key={uuid()} value={item.colorID}>
                          {item.color}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label for="exampleSelect1" className="control-label">
                      Dung lượng
                    </label>

                    <select
                      className="form-control"
                      onChange={(e) => handleSelectChange(e, "storage")}
                      value={selectedStorage}
                    >
                      {storage.map((item) => (
                        <option key={uuid()} value={item.storageID}>
                          {item.storage_value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group  col-md-3">
                    <label className="control-label">Giá bán</label>
                    <input
                      className="form-control"
                      type="number"
                      name="prodPrice"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group  col-md-3">
                    <label className="control-label">Giá bán</label>
                    <input
                      className="form-control"
                      type="number"
                      name="prodSale"
                      value={prodSale || 0}
                      onChange={(e) => setProdSale(e.target.value)}
                    />
                  </div> */}
                  <div className="form-group col-md-3">
                    <label className="control-label">Ảnh sản phẩm </label>
                    <input
                      className="form-control"
                      placeholder=""
                      type="text"
                      name="prodImg"
                      value={prodImg}
                      onChange={(e) => setProdImg(e.target.value)}
                    />
                    {prodImg && (
                      <img
                        src={prodImg}
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "auto",
                          margin: "20px",
                        }}
                      />
                    )}
                  </div>

                  <div className="form-group col-md-3">
                    <Button
                      padding="10px"
                      w="100%"
                      h="auto"
                      color="#fff"
                      borderRadius="10px"
                      backgroundColor="red"
                      _hover={{ color: "red", backgroundColor: "#fff" }}
                      border="1px solid red"
                      className=" btn-save"
                      type="button"
                    >
                      <button type="submit">Thêm biến thể</button>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
