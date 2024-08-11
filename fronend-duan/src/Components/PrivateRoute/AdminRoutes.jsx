import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

function AdminRoute({ children }) {
  const { isAuth, admin } = useSelector((store) => store.AuthManager);

  const navigate = useNavigate();
  const isReloaded = useRef(false);

  useEffect(() => {
    // Kiểm tra điều kiện cho việc chuyển hướng
    if (!isAuth || admin === undefined || isNaN(admin) || admin === 0) {
      // Use the navigate function directly
      navigate("/");

      // Reload the current page only once
      if (!isReloaded.current) {
        window.location.reload();
        isReloaded.current = true;
      }
    }
  }, [isAuth, admin, navigate]);

  return children;
}

export default AdminRoute;
