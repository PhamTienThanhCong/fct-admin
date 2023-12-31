import { BellOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { DashboardTwoTone } from "@ant-design/icons";
import { RiCommunityLine } from "react-icons/ri";
import { RiMenuSearchLine } from "react-icons/ri";
import { ImAddressBook } from "react-icons/im";
import { BsChatText } from "react-icons/bs";

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
		icon: <RiCommunityLine/>,
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
		icon: <RiMenuSearchLine />,
		link: "/manage_station",
		title: "manage_station",
		subMenu: [
			{
				key: "10",
				link: "/list_station",
				title: "list_station",
			},
      {
				key: "11",
				link: "/station_ports",
				title: "station_ports",
			},
		],
	},
  {
		key: "12",
		icon: <ImAddressBook />,
		link: "/order",
		title: "order",
		subMenu: [
			{
				key: "13",
				link: "/list_order",
				title: "list_order",
			}
		],
	},
	{
		key: "14",
		icon: <BellOutlined />,
		link: "/notification",
		title: "notification",
		subMenu: undefined,
	},
	{
		key: "15",
		icon: <BsChatText />,
		link: "/chat",
		title: "manage_question_and_answer",
		subMenu: [
			{
				key: "151",
				link: "/chat",
				title: "Quản lý đoạn chat",
			},
            {
				key: "152",
				link: "/chat/training",
				title: "Huấn luyệt chatbot",
			},
            {
				key: "153",
				link: "/chat/demo",
				title: "Demo chatbot",
			},
		],
	},
	{
		key: "16",
		icon: <UserOutlined />,
		link: "/myAccount",
		title: "account",
		subMenu: undefined,
	},
];
