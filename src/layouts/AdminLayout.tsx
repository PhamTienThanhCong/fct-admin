import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import SliderBarComponents from "./components/SliderBarComponents";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { ADMIN_SLIDER } from "../constants/roleLink";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-slider">
      <SliderBarComponents collapsed={collapsed} menuItems={ADMIN_SLIDER} />
      
      <Layout>
        <HeaderComponent collapsed={collapsed} toggleMenu={toggleMenu} />
        
        <Content className="content-container">
          <Outlet />
        </Content>
        
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
