import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;
interface PageTitleProps {
  title: string; 
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Title level={3} className='pageTitle'>
      {title}
    </Title>
  );
}

export default PageTitle;
