import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { memo } from "react";

interface SliderBarComponentsProps {
  collapsed: boolean;
  menuItems: {
    key: string;
    icon: any;
    link: string;
    title: string;
  }[];
}

const SliderBarComponents = (props: SliderBarComponentsProps) => {
  const { collapsed, menuItems } = props;
  const location = useLocation();

  const menuSelected = location.pathname.split("/")[1];
  // get key from menuItems
  const menuSelectedKey = menuItems
    .filter((item) => {
      return item.link.split("/")[1] === menuSelected;
    })
    .map((item) => item.key)[0];

  const menuItemRenders = menuItems.map((item) => ({
    ...item,
    label: <Link to={item.link}>{item.title}</Link>,
  }));

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
      <div className="logo">
        <img src={Logo} alt="" className={collapsed ? "collapsed-logo" : ""} />
        {!collapsed && <h2 style={{ fontSize: "25px" }}>Finding Car</h2>}
      </div>
      <Menu
        theme="dark"
        className="drawer"
        mode="inline"
        defaultSelectedKeys={menuSelected === "" ? ["1"] : [menuSelectedKey]}
        items={menuItemRenders}
      />
    </Sider>
  );
};

export default memo(SliderBarComponents);
