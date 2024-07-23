import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Navbar({ isLoggedIn }) {
  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
      {isLoggedIn && (
        <>
          <Menu.Item key="students">
            <Link to="/students">Students</Link>
          </Menu.Item>
          <Menu.Item key="teachers">
            <Link to="/teachers">Teachers</Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="user">
        <Link to="/user">User</Link>
      </Menu.Item>
      {!isLoggedIn && (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Navbar;
