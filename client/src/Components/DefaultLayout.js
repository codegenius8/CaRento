import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <Menu>
      <Menu.Item>
        <a>Home</a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/mybookings">Bookings</Link>
      </Menu.Item>
      <Menu.Item>
        <a>Profile</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={()=>{
          localStorage.removeItem("user")
          window.location.href='/login'
        }}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <div className="d-flex justify-content-between">
          <h1>CaRento</h1>
          <Dropdown overlay={menu} placement="bottom">
            <Button>{user.username}</Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
