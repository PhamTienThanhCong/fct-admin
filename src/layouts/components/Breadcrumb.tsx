import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../../App.scss";
import { useTranslation } from "react-i18next";

interface BreadcrumbComponentProps {
  adminSlider: any[];
}

interface MenuItem {
  key: string;
  link: string;
  title: string;
  subMenu?: MenuItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ adminSlider }) => {
  const { t } = useTranslation('translation');
  const location = useLocation();
  const currentPath = location.pathname;
  const breadcrumbItems: MenuItem[] = [];

  const findBreadcrumb = (menu: MenuItem[], path: string, parentBreadcrumb: MenuItem[] = []) => {
    for (const item of menu) {
      if (item.link === path) {
        breadcrumbItems.push(...parentBreadcrumb); // Thêm breadcrumb của menu cha
        breadcrumbItems.push(item); // Thêm breadcrumb của menu con
        return;
      } else if (item.subMenu) {
        // Đệ quy để tìm breadcrumb của menu con và truyền vào breadcrumb của menu cha
        findBreadcrumb(item.subMenu, path, [...parentBreadcrumb, item]);
      }
    }
  };

  findBreadcrumb(adminSlider, currentPath);

  return (
    <>
      <Breadcrumb style={{ margin: "20px 0" }}>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item
            key={item.key}
            className={item.link === currentPath ? "active-breadcrumb" : ""}
          >
            {item.subMenu ? ( // Kiểm tra xem có breadcrumb con hay không
              <span className="breadcrumb_header">{t(item.title)}</span>
            ) : (
              t(item.title) // Hiển thị văn bản bình thường nếu không có breadcrumb con
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComponent;
