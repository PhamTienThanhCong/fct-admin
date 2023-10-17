import { BellOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { DashboardTwoTone } from "@ant-design/icons";

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
		link: "/listUser",
		title: "user_list",
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
		],
	},
	{
		key: "4",
		icon: <BellOutlined />,
		link: "/notification",
		title: "notification",
		subMenu: undefined,
	},
	{
		key: "5",
		icon: <UserOutlined />,
		link: "/myAccount",
		title: "account",
		subMenu: undefined,
	},
];
