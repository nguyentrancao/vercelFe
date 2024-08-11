import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editsp = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook cho điều hướng

  const [products, setProduct] = useState({});
  const [formData, setFormData] = useState({
    prodName: "",
    prodImg: "",
    QTY: "",
    prodSale: "",
    prodPrice: "",  
    prodType: "",
    catName: "",
    prodDesc: "", // Thêm prodDesc vào formData
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/products/${id}`
      );
      const productData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
      setProduct(productData);
      setFormData({
        prodName: productData.prodName || "",
        prodImg: productData.prodImg || "",
        QTY: productData.QTY || "",
        prodSale: productData.prodSale || "",
        prodPrice: productData.prodPrice || "",
        // prodPriceSale: productData.prodPriceSale || "",
        prodType: productData.prodType || "",
        // catName: productData.catName || "",
        prodDesc: productData.prodDesc || "", // Thêm prodDesc vào setFormData
      });
    } catch (error) {
      setError("Lỗi khi lấy sản phẩm. Vui lòng thử lại.");
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data before submit:", formData);
    try {
      await axios.put(
        `${process.env.REACT_APP_DATABASE_API_URL}/products/${id}`,
        formData
      );
      alert("Cập nhật sản phẩm thành công!");
      // Điều hướng đến trang quản lý sản phẩm sau khi cập nhật thành công
      navigate("/admin/quanlysp"); // Thay thế bằng route thực tế của bạn
    } catch (error) {
      setError("Cập nhật sản phẩm không thành công. Vui lòng thử lại.");
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="app sidebar-mini rtl">
      <main className="app-content">
        <div>
          <h1>Sửa Sản Phẩm</h1>
          <form onSubmit={handleSubmit} className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Tên sản phẩm</label>
              <input
                className="form-control"
                placeholder="Tên sản phẩm"
                type="text"
                name="prodName"
                value={formData.prodName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Giá bán</label>
              <input
                className="form-control"
                placeholder="Giá bán"
                type="number"
                name="prodPrice"
                value={formData.prodPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ảnh sản phẩm</label>
              <input
                className="form-control"
                placeholder="Link ảnh sản phẩm"
                type="text"
                name="prodImg"
                value={formData.prodImg}
                onChange={handleChange}
              />
              {formData.prodImg && (
                <img
                  src={formData.prodImg}
                  alt="Product"
                  style={{ width: "200px", height: "auto", margin: "20px" }}
                />
              )}
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Mô tả sản phẩm</label>
              <textarea
                className="form-control"
                placeholder="Mô tả sản phẩm"
                name="prodDesc"
                value={formData.prodDesc}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Editsp;
