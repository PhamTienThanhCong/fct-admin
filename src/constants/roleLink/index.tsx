import { BellOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { DashboardTwoTone } from '@ant-design/icons';

export const ADMIN_SLIDER = [
  {
    key: "1",
    icon: <DashboardTwoTone />,
    link: "/",
    title: "Dashbroad",
  },
  {
    key: "2",
    icon: <UsergroupAddOutlined />,
    link: "/listUser",
    title: "User List",
  },
  {
    key: "3",
    icon: <BellOutlined />,
    link: "/notification",
    title: "Notification",
  },
  {
    key: "4",
    icon: <UserOutlined/>,
    link: "/profile",
    title: "Profile",
  },
];


