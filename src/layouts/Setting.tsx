import React, { useState, useEffect, useRef } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '../locales/i18n';

const Setting: React.FC = () => {
  const { t } = useTranslation('translation');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Khởi tạo chế độ mặc định từ localStorage hoặc chế độ sáng
    return localStorage.getItem('darkMode') === 'true';
  });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuVisible(false);
    }
  };

  const changeLanguage = (languageValue: string) => {
    localStorage.setItem('language', languageValue);
    i18n.changeLanguage(languageValue);
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [menuVisible]);

  useEffect(() => {
    // Lưu chế độ sáng/tối vào localStorage khi giá trị thay đổi
    localStorage.setItem('darkMode', isDarkMode.toString());
    
    // Thêm/xóa lớp dark-mode trên thẻ body tùy thuộc vào chế độ
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const items: MenuProps['items'] = [
    {
      key: 'language',
      type: 'group',
      label: t('language'),
      children: [
        {
          key: 'vi',
          label: <div onClick={() => changeLanguage('vi')}>{t('vi_language')}</div>,
        },
        {
          key: 'en',
          label: <div onClick={() => changeLanguage('en')}>{t('en_language')}</div>,
        },
      ],
    },
    {
      key: 'appearance',
      type: 'group',
      label: t('interface'),
      children: [
        {
          key: 'light',
          label: t('light'),
          onClick: () => setIsDarkMode(false), // Chuyển sang chế độ sáng
        },
        {
          key: 'dark',
          label: t('dark'),
          onClick: () => setIsDarkMode(true), // Chuyển sang chế độ tối
        },
      ],
    },
  ];

  return (
    <div ref={menuRef}>
      <SettingOutlined onClick={toggleMenu} style={{ cursor: 'pointer' }} />
      <div className={`menuSetting${menuVisible ? ' active' : ''}`}>
        <Menu mode="vertical" items={items} />
      </div>
    </div>
  );
};

export default Setting;
