import React from "react";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import "./DashBroad.scss"; // Đảm bảo bạn import CSS đúng cách

function DashBroad() {
  return (
    <div>
      <Row gutter={16}>
        <Col md={6}>
          <div className="dashboard-box">
            <div className="icon-container" style={{ backgroundColor: "#4cd137" }}>
              <span>
                <ShoppingCartOutlined/>
              </span>
            </div>
            <div className="dashbroad-title">
              <p className="dashboard-text">Order</p>
              <span className="dashboard-number">12345</span>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="dashboard-box">
            <div className="icon-container" style={{ backgroundColor: "#3498db" }}>
              <span>
                <ShoppingOutlined/>
              </span>
            </div>
            <div className="dashbroad-title">
              <p className="dashboard-text">Order</p>
              <span className="dashboard-number">12345</span>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="dashboard-box">
            <div className="icon-container" style={{ backgroundColor: "#9b59b6" }}>
              <span>
                <UserOutlined/>
              </span>
            </div>
            <div className="dashbroad-title">
              <p className="dashboard-text">Order</p>
              <span className="dashboard-number">12345</span>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="dashboard-box">
            <div className="icon-container" style={{ backgroundColor: "#e74c3c" }}>
              <span>
                <DollarCircleOutlined style={{ color: "#fff", fontSize: "20px" }} />
              </span>
            </div>
            <div className="dashbroad-title">
              <p className="dashboard-text">Order</p>
              <span className="dashboard-number">12345</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashBroad;
