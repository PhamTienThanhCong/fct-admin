import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { memo } from 'react';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
    }[];
  }[];
}
const SliderBarComponents = (props: SliderBarComponentsProps) => {
  const { t } = useTranslation('translation');
  const { collapsed, menuItems, toggleMenu } = props;
  const location = useLocation();

  // Lấy đường dẫn hiện tại
  const currentPath = location.pathname;

  return (
    <Sider className="drawer custom-sidebar" trigger={null} collapsible collapsed={collapsed} width={250}>
      <div className="logo">
        <img src={Logo} alt="" className={collapsed ? "collapsed-logo" : ""} />
        {!collapsed && <h2 style={{ fontSize: "25px" }}>Finding Car</h2>}
      </div>
      <Menu
        className='Menu_slideBar'
        mode="inline"
        selectedKeys={[currentPath]} // Chỉ kích hoạt mục tổng quan dựa trên đường dẫn hiện tại
      >
        {menuItems.map((item) => {
          if (item.subMenu && item.subMenu.length > 0) {
            return (
              <SubMenu key={item.key} icon={item.icon} title={t(item.title)}>
                {item.subMenu.map((subItem) => (
                  <Menu.Item key={subItem.link}>
                    <Link to={subItem.link}>{t(subItem.title)}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.link} icon={item.icon}>
                <Link to={item.link}>{t(item.title)}</Link>
              </Menu.Item>
            )
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