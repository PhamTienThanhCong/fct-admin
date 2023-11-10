import { BellOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { DashboardTwoTone } from "@ant-design/icons";
import { FaStore  } from 'react-icons/fa';
import AccessForbidden from "../../modules/auth/AccessForbidden";

const injectProps = (props :any, Component :any) => {
  return <Component {...props} />
}

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
                key: "2.3",
                link: "/listUser/customer",
                title: "list_customer",
            }
		],
	},
	{
		key: "5",
		icon: <FaStore  />,
		link: "/manage_supplier",
		title: "manage_supplier",
		subMenu: [
			{
				key: "6",
				link: "/rescue_service",
				title: "rescue_service",
			},
			{
				key: "7",
				link: "/car_type",
				title: "car_type",
			}
		],
	},
	{
		key: "8",
		icon: <BellOutlined />,
		link: "/notification",
		title: "notification",
		subMenu: undefined,
	},
	{
		key: "9",
		icon: <UserOutlined />,
		link: "/myAccount",
		title: "account",
		subMenu: undefined,
	},
];
