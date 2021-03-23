import React from "react";
import "./Header.scss";
import LogoImage from "../../assets/logo.png";
import { Input, Menu } from "antd";

const { Item } = Menu;

const AppHeader = props => {
  return (
    <div className="AppHeader">
      <h1 className="page-title">
        <img src={LogoImage} alt="logo" />
      </h1>
      <div className="search">
        <Input.Search />
      </div>
      <div className="topnav">
        <Menu mode="horizontal" theme="dark">
          <Item>Menu1</Item>
          <Item>Menu2</Item>
          <Item>Menu3</Item>
        </Menu>
      </div>
    </div>
  );
};

export default AppHeader;
