import React from 'react';

interface PageTitleProps {
  title: string; 
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
	  <div className='pageTitle'>{title}</div>
  );
}

export default PageTitle;
