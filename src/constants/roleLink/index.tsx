import { BellOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { DashboardTwoTone } from "@ant-design/icons";
import { BsChatDots } from "react-icons/bs";
import { FaStore  } from 'react-icons/fa';

export const ADMIN_SLIDER = [
	{
		key: "1",
		icon: <DashboardTwoTone />,
		link: "/",
		title: "dashBroad",
		subMenu: undefined,
	},

	{
		key: "2",
		icon: <UsergroupAddOutlined />,
		link: "/manage_user",
		title: "manage_user",
		subMenu: [
			{
				key: "3",
				link: "/listUser/role",
				title: "role",
			},
			{
				key: "4",
				link: "/listUser/user",
				title: "list_user",
			},
			{
				key: "5",
				link: "/listUser/customer",
				title: "list_customer",
			}
		],
	},
	{
		key: "6",
		icon: <FaStore  />,
		link: "/manage_supplier",
		title: "manage_supplier",
		subMenu: [
			{
				key: "7",
				link: "/rescue_service",
				title: "rescue_service",
			},
			{
				key: "8",
				link: "/car_type",
				title: "car_type",
			}
		],
	},
  {
		key: "9",
		icon: <FaStore  />,
		link: "/manage_station",
		title: "manage_station",
		subMenu: [
			{
				key: "10",
				link: "/list_station",
				title: "list_station",
			}
		],
	},
	{
		key: "11",
		icon: <BellOutlined />,
		link: "/notification",
		title: "notification",
		subMenu: undefined,
	},
	{
		key: "12",
		icon: <BsChatDots  />,
		link: "/chatbot",
		title: "chatbot",
		subMenu: [
			{
				key: "13",
				link: "/chatbot/list",
				title: "list_chatbot",
			},
			{
				key: "14",
				link: "/chatbot/train",
				title: "training_chatbot",
			}
		],
	},
	{
		key: "15",
		icon: <UserOutlined />,
		link: "/myAccount",
		title: "account",
		subMenu: undefined,
	},
];
