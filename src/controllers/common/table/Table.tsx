import React, { useState } from 'react';
import { Table } from 'antd';

interface TableComponentProps {
  data: any[]; 
  columns: any[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);

  const handleChangePage = (page: number) => {
	setCurrentPage(page);
  };

  return (
    <Table
      columns={columns}
      dataSource={displayedData}
      pagination={{
        current: currentPage,
        total: data.length,
        pageSize: pageSize,
        onChange: handleChangePage,
      }}
    />
  );
};

export default TableComponent;
