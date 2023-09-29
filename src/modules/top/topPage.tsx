import React, { useState } from "react";
import {
    BellOutlined,
    DashboardTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Row, Col, Avatar, Tooltip, Badge } from "antd";
import ContentLayout from "../content/ContentLayout";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/images/logo.png";
import { Footer } from "antd/es/layout/layout";

const { Header, Sider, Content } = Layout;

const Topage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    const menuSelectedKey =
        {
            "/dashBroad": "1",
            "/listUser": "2",
        }[location.pathname] || "1";

    return (
        <Layout className="layout-slider">
            <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
                <Menu
                    theme="dark"
                    className="drawer"
                    mode="inline"
                    defaultSelectedKeys={[menuSelectedKey]}>
                    <div className="logo">
                        <img src={Logo} alt="" className={collapsed ? "collapsed-logo" : ""} />
                        {!collapsed && <h2 style={{ fontSize: "25px" }}>Finding Car</h2>}
                    </div>
                    <Menu.Item key="1" icon={<DashboardTwoTone />}>
                        <Link to="/dashBroad">Dashbroad</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                        <Link to="/listUser">User List</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "#fff" }}>
                    <Row justify="space-between">
                        <Col md={16}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={toggleMenu}
                                style={{
                                    fontSize: "16px",
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col md={4}>
                            <Badge count={30}>
                                <div style={{ fontSize: "23px" }}>
                                    <Tooltip title="Thông báo" placement="bottom">
                                        <BellOutlined />
                                    </Tooltip>
                                </div>
                            </Badge>
                        </Col>
                        <Col md={4}>
                            <div className="account-header">
                                <Tooltip title="Tài khoản" placement="bottom">
                                    <Avatar size="default" icon={<UserOutlined />} />
                                </Tooltip>
                                <span
                                    style={{
                                        marginLeft: "10px",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                    }}>
                                    Vũ Thị miên
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: "20px",
                        padding: 10,
                        minHeight: 280,
                        backgroundColor: "#fff",
                    }}>
                    <ContentLayout />
                </Content>
                <Footer className="footer">Được phát triển bởi 1 nhóm sinh viên 😘</Footer>
            </Layout>
        </Layout>
    );
};

export default Topage;
