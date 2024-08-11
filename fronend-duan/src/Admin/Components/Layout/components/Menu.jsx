import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [currentPage, setCurrentPage] = useState("/");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <header className="app-header">
        <a
          className="app-sidebar__toggle"
          href="#"
          data-toggle="sidebar"
          aria-label="Hide Sidebar"
        ></a>
        <ul className="app-nav">
          <li>
            <a className="app-nav__item" href="/">
              <i className="bx bx-log-out bx-rotate-180"></i>{" "}
            </a>
          </li>
        </ul>
      </header>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <div
            className="app-sidebar__user-avatar-container"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <img
              className="app-sidebar__user-avatar"
              src="data:image/png;base64,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"
              width="50px"
              alt="User Image"
            />
          </div>
          <div>
            <p className="app-sidebar__user-name">
              <b>Admin</b>
            </p>
            <p className="app-sidebar__user-designation">
              Chào mừng bạn trở lại
            </p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
          <li>
            <Link
              to="/admin/dashboard"
              className={`app-menu__item ${
                currentPage === "/admin/dashboard" ? "active" : ""
              }`}
              onClick={() => handlePageChange("/admin/dashboard")}
            >
              <i className="app-menu__icon bx bx-tachometer"></i>
              <span className="app-menu__label">Bảng điều khiển</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quanlykh"
              className={`app-menu__item ${
                currentPage === "/admin/quanlykh" ? "active" : ""
              }`}
              onClick={() => handlePageChange("/admin/quanlykh")}
            >
              <i className="app-menu__icon bx bx-user-voice"></i>
              <span className="app-menu__label">Quản lý khách hàng</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quanlysp"
              className={`app-menu__item ${
                currentPage === "/admin/quanlysp" ? "active" : ""
              }`}
              onClick={() => handlePageChange("/admin/quanlysp")}
            >
              <i className="app-menu__icon bx bx-purchase-tag-alt"></i>
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quanlydonhang"
              className={`app-menu__item ${
                currentPage === "/admin/quanlydonhang" ? "active" : ""
              }`}
              onClick={() => handlePageChange("/admin/quanlydonhang")}
            >
              <i className="app-menu__icon bx bx-task"></i>
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/doanhthu"
              className={`app-menu__item ${
                currentPage === "/admin/doanhthu" ? "active" : ""
              }`}
              onClick={() => handlePageChange("/admin/doanhthu")}
            >
              <i className="app-menu__icon bx bx-pie-chart-alt-2"></i>
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Menu;
