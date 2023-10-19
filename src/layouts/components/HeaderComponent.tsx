import React from "react";
import { Row, Col, Tooltip, Badge, Avatar, Dropdown, Menu } from "antd";
import {
	BellOutlined,
	UserOutlined,
	LogoutOutlined,
	ExclamationCircleFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { logout, toggleLogout } from "../../modules/auth/slices";
import BreadcrumbComponent from "../components/Breadcrumb";
import { ADMIN_SLIDER } from "../../constants/roleLink";
import { Header } from "antd/es/layout/layout";
import avataImage from '../../assets/images/avata.png'
interface HeaderComponentProps {
	collapsed: boolean;
	toggleMenu: () => void;
	location: {
		pathname: string;
	};
}

const HeaderComponent: React.FC<HeaderComponentProps> = (props) => {
	const currentPath = props.location.pathname;
	const dispatch = useDispatch();

	const handleAvatarClick = () => {
		console.log("ok");
	};

	const { confirm } = Modal;

	const showConfirmLogout = () => {
		confirm({
			title: "Bạn có chắc chắn muốn đăng xuất ?",
			icon: <ExclamationCircleFilled />,
			onOk() {
				dispatch(logout());
				dispatch(toggleLogout());
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const menu = (
		<Menu>
      <div className="header-account">
        <img style={{width:'50px',height:'50px',borderRadius:'50%',marginRight:'10px'}} src={avataImage} alt=""/>
        <div>
          <p>cong</p>
          <span style={{color:'#ccc',fontWeight:'600'}}>cong@gmail.com</span>
        </div>
      </div>
			<Menu.Item key="1" icon={<UserOutlined />}>
				<a href="/myAccount">Account</a>
			</Menu.Item>
			<Menu.Item style={{marginBottom:'5px'}} key="2" icon={<LogoutOutlined />}>
				<p  onClick={showConfirmLogout}>Logout</p>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<Header className="header" style={{ padding: 0, background: "#fff" }}>
				<Row justify="space-between">
					<Col md={16}>
						<BreadcrumbComponent adminSlider={ADMIN_SLIDER} />
					</Col>
					<Col xs={12} sm={3} md={3.5}>
						<Badge count={30}>
							<a
								className="icon_noti"
								href="/notification"
								style={{ fontSize: "23px", color: "#333" }}>
								<Tooltip title="Thông báo" placement="bottom">
									<BellOutlined />
								</Tooltip>
							</a>
						</Badge>
					</Col>
					<Col sm={12} md={4}>
						<Dropdown overlay={menu} trigger={["click"]} className="dropdown">
							<div className="account-header">
								<img 
                  src={avataImage}
                  alt=""
									className="avata_header"
									onClick={handleAvatarClick}
								/>
								<p
									style={{
										marginLeft: "10px",
										fontSize: "20px",
										fontWeight: "600",
										whiteSpace: "nowrap",
									}}>
									Vũ Thị miên
								</p>
							</div>
						</Dropdown>
					</Col>
				</Row>
			</Header>
		</>
	);
};

export default HeaderComponent;
