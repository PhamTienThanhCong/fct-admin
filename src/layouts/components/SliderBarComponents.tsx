import React from 'react';
import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { memo } from 'react';
import '../../App.scss';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'

const { SubMenu } = Menu;

interface SliderBarComponentsProps {
  collapsed: boolean;
  toggleMenu: () => void;
  menuItems: {
    key: string;
    icon: React.ReactNode;
    link: string;
    title: string;
    subMenu?: {
      key: string;
      link: string;
      title: string;
    };
  }[];
}

const SliderBarComponents = (props: SliderBarComponentsProps) => {
  const { t } = useTranslation('translation')
  const { collapsed, menuItems,toggleMenu} = props;
  const location = useLocation();

  const menuSelected = location.pathname.split("/")[1];
  const menuSelectedKey = menuItems
    .filter((item) => {
      return item.link.split("/")[1] === menuSelected;
    })
    .map((item) => item.key)[0];

    return (
      <Sider className="drawer custom-sidebar" trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="logo">
          <img src={Logo} alt="" className={collapsed ? "collapsed-logo" : ""} />
          {!collapsed && <h2 style={{ fontSize: "25px" }}>Finding Car</h2>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={menuSelected === "" ? ["1"] : [menuSelectedKey]}
        >
          {menuItems.map((item) => {
            if (item.subMenu) {
              return (
                <SubMenu key={item.key} icon={item.icon} title={t(item.title)}>
                  <Menu.Item key={item.subMenu.key} className={menuSelected === item.subMenu.link ? 'ant-menu-item-selected' : ''}>
                    <Link to={item.subMenu.link}>{t(item.subMenu.title)}</Link>
                  </Menu.Item>
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon} className={menuSelected === item.link ? 'ant-menu-item-selected' : ''}>
                  <Link to={item.link}>{t(item.title)}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <Button
          className='toggleMenu'
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMenu}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Sider>
    );
};

export default memo(SliderBarComponents);
