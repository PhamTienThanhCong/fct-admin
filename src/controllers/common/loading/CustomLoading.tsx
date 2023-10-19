import React from 'react';
import { Space, Spin } from 'antd';

const CustomLoading: React.FC = () => (
  <Space
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
    size="middle"
  >
    <Spin size="large" />
    <div style={{ textAlign: 'center', marginTop: '8px', width: '100%' ,color:'#4096ff'}}>
      Loading...
    </div>
  </Space>
);

export default CustomLoading;
