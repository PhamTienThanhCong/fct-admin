import React from "react";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import "./DashBroad.scss";
import PageTitle from "../../layouts/components/Pagetitle";
import { useTranslation } from 'react-i18next'

function DashBroad() {
  const { t } = useTranslation('translation')
  return (
    <div className="wapper_dasbroad">
     <div className="item_dasbroad">
        <PageTitle title ={t('dashBroad')}/>
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
    </div>
  );
}

export default DashBroad;
