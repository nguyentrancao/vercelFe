import React from "react";
import "./product.css";

const ProductTable = ({ product }) => {
  if (!product) {
    return null; // or some placeholder for when data is not available
  }

  return (
    <table
      style={{
        border: "1px solid #ccc",
        width: "91%",
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      <thead style={{ backgroundColor: "#f2f2f2", padding: "10px" }}>
        <tr>
          <th colSpan="2" style={{ textAlign: "center" }}>
            Thông tin cấu hình
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>
            <strong>Sản phẩm:</strong>
          </td>
          <td style={{ padding: "10px" }}>{product.prodName}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>
            <strong>Màu:</strong>
          </td>
          <td style={{ padding: "10px" }}>{product.color}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>
            <strong>Hãng:</strong>
          </td>
          <td style={{ padding: "10px" }}>{product.catName}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>
            <strong>Dung lượng:</strong>
          </td>
          <td style={{ padding: "10px" }}>{product.storage_value}</td>
        </tr>
        {/* Other rows go here */}
      </tbody>
    </table>
  );
};

export default ProductTable;
