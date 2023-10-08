import {
	BellOutlined,
	ExclamationCircleFilled,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Modal, Row, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import { Dropdown, Menu } from "antd";
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { useDispatch } from "react-redux";
import { logout, toggleLogout } from "../../modules/auth/slices";
interface IHeaderComponentProps {
	collapsed: boolean;
	toggleMenu: () => void;
}

const HeaderComponent = (props: IHeaderComponentProps) => {
  const { collapsed, toggleMenu } = props;
  const dispatch = useDispatch()
  
	const handleAvatarClick = () => {
		console.log("ok");
	};

  const { confirm } = Modal

  const showConfirmLogout = () => {
    confirm({
      title: "Bạn có chắc chắn muốn đăng xuất ?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(logout())
        dispatch(toggleLogout())
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

	const menu = (
		<Menu>
      <Menu.Item key="1" icon={<UserOutlined/>}>
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Item  key="3" icon={<LogoutOutlined />}>
        <p onClick={showConfirmLogout}>Logout</p>
      </Menu.Item>
    </Menu>
	);

	return (
		<>
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
  						<a href="/notification" style={{ fontSize: "23px", color: "#333" }}>
  							<Tooltip title="Thông báo" placement="bottom">
  								<BellOutlined />
  							</Tooltip>
  						</a>
  					</Badge>
  				</Col>
  				<Col md={4}>
  					<Dropdown 
              overlay={menu} 
              trigger={["click"]}
              className="dropdown"
            >
  						<div className="account-header">
  							<Avatar
  								size="default"
  								icon={<UserOutlined />}
  								onClick={handleAvatarClick}
  							/>
  							<span
  								style={{
  									marginLeft: "10px",
  									fontSize: "20px",
  									fontWeight: "bold",
  								}}>
  								Vũ Thị miên
  							</span>
  						</div>
  					</Dropdown>
  				</Col>
  			</Row>
  		</Header>
		</>
	);
};

export default HeaderComponent;
