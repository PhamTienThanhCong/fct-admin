import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Row, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";


interface IHeaderComponentProps {
    collapsed: boolean;
    toggleMenu: () => void;
};

const HeaderComponent = (props: IHeaderComponentProps) => {
    const { collapsed, toggleMenu } = props;
    return (
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
                  }}
                >
                  Vũ Thị miên
                </span>
              </div>
            </Col>
          </Row>
        </Header>
    );
}

export default HeaderComponent;