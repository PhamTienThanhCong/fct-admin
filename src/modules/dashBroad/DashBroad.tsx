import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import '../dashBroad/DashBroad.scss';

function DashBroad() {
    return (
       <div>
            <Row gutter={16}>
                <Col md={6}>
                    <div className="dashboard-box">
                        <div className="icon-container">
                            <ShoppingCartOutlined style={{ color: "#FF5733" }} />
                        </div>
                        <span className="dashboard-text">Order</span>
                        <span className="dashboard-number">12345</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="dashboard-box">
                        <div className="icon-container">
                            <ShoppingOutlined style={{ color: "#3498db" }} />
                        </div>
                        <span className="dashboard-text">Order</span>
                        <span className="dashboard-number">12345</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="dashboard-box">
                        <div className="icon-container">
                            <UserOutlined style={{ color: "#9b59b6" }} />
                        </div>
                        <span className="dashboard-text">Order</span>
                        <span className="dashboard-number">12345</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="dashboard-box">
                        <div className="icon-container">
                            <DollarCircleOutlined style={{ color: "#e74c3c", fontSize: "20px" }} />
                        </div>
                        <span className="dashboard-text">Order</span>
                        <span className="dashboard-number">12345</span>
                    </div>
                </Col>
            </Row>
       </div>
    );
}

export default DashBroad;
