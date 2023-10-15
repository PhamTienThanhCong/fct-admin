import { ADMIN_SLIDER } from "../constants/roleLink";
import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import SliderBarComponents from "./components/SliderBarComponents";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import '../App.scss'
import Setting from "./Setting";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-slider">
      <SliderBarComponents toggleMenu={toggleMenu} collapsed={collapsed} menuItems={ADMIN_SLIDER} />
      <Layout style={{ overflowY: 'auto' }}>
        <HeaderComponent collapsed={collapsed} toggleMenu={toggleMenu} location={window.location} />
        <Content className="content-container">
          <Outlet />
          <div className="settingFilled">
            <Setting/>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
