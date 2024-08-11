import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Components/AllRoutes";
import Footer from "./Components/Footer.jsx/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
const App = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const isAdminRoute = currentPath.includes("/admin");
  return (
    <div className="App">
      <AuthContextProvider>
        {!isAdminRoute && <Navbar />}
        <AllRoutes />
        {!isAdminRoute && <Footer />}
      </AuthContextProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
