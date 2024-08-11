import React from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchUsers } from "./api";
import axios from "axios";
import { render } from "@testing-library/react";
const Quanlynv = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchID, setSearchID] = React.useState("");
  const [searchUsername, setSearchUsername] = React.useState("");

  // Hàm xử lý sự kiện thay đổi giá trị tìm kiếm

  useEffect(() => {
    const fetchApiUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
        setLoading(false);
      } catch (error) {}
    };
    fetchApiUsers();
  }, []);
  const handleSearchIDChange = (e) => {
    setSearchID(e.target.value);
  };

  const deleteUser = async (userID) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DATABASE_API_URL}/users/address/${userID}`);
      alert("XÓA NGƯỜI DÙNG THÀNH CÔNG");
      // Xóa người dùng khỏi state sau khi xóa thành công
      setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error.response ? error.response.data : error.message);
      alert("Xóa người dùng không thành công. Vui lòng thử lại.");
    } console.log(`${process.env.REACT_APP_DATABASE_API_URL}/users/address/${userID}`);
  };

  // const deleteUser = async (userID) => {
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_DATABASE_API_URL}/users/address${userID}`);
  //     alert("XÓA NGƯỜI DÙNG THÀNH CÔNG");
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
  //   } catch (error) {
  //     console.error("Lỗi khi xóa người dùng:", error.response ? error.response.data : error.message);
  //     alert("Xóa người dùng không thành công. Vui lòng thử lại.");
  //   }
  // };
 

  const handleSearchUsernameChange = (e) => {
    setSearchUsername(e.target.value);
  };
  const navigate = useNavigate();
  //render danh sách user từ api
  const renderUsers = () => {
    if (loading) return <p>Loading...</p>;

    // Áp dụng tìm kiếm theo ID và username
    const filteredUsers = users.filter(
      (user) =>
        (user.userID ?? "")
          .toString()
          .toLowerCase()
          .includes(searchID.toLowerCase()) &&
        user.username.toLowerCase().includes(searchUsername.toLowerCase()),
    );

    return filteredUsers.map((user, index) => (
      <tr key={index}>
        <td width="10">
          <input type="checkbox" name="check1" value="1" />
        </td>
        <td>{user.userID}</td>
        <td>{user.username}</td>

        <td>
          {user.flat} {user.street} {user.state} {user.city}
        </td>

        <td>{user.mobile}</td>

        <td
          class="table-td-center"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button
          onClick={()=> deleteUser(user.userID)}
            class="btn btn-primary btn-sm trash"
            type="button"
            title="Xóa"
            onclick="myFunction(this)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
         
        </td>
      </tr>
    ));
  };

  return (
    <body onload="time()" class="app sidebar-mini rtl">
      {/* <!-- Navbar--> */}

      <main class="app-content">
        <div class="app-title">
          <ul class="app-breadcrumb breadcrumb side">
            <li class="breadcrumb-item ">
              <a href="#">
                <b>Danh sách khách hàng</b>
              </a>
            </li>
          </ul>
          <div id="clock"></div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="tile">
              <div class="tile-body">
                <div class="row element-button">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm theo ID"
                      value={searchID}
                      onChange={handleSearchIDChange}
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm theo username"
                      value={searchUsername}
                      onChange={handleSearchUsernameChange}
                    />
                  </div>
                </div>
                <table
                  class="table table-hover table-bordered js-copytextarea"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th width="10">
                        <input type="checkbox" id="all" />
                      </th>
                      <th style={{ fontSize: "20px", fontWeight: "600" }}>
                        ID
                      </th>
                      <th
                        width="20%"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        User
                      </th>
                      <th style={{ fontSize: "20px", fontWeight: "600" }}>
                        Địa chỉ
                      </th>

                      <th
                        width="15%"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        SDT
                      </th>

                      <th
                        width="10%"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        Tính năng
                      </th> 
                    </tr>
                  </thead>
                  <tbody>{renderUsers()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

export default Quanlynv;
