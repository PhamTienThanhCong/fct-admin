import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps, ColumnType } from "antd/es/table";

interface IDynamicListProps {
  keyId: string;
  listData: any[];
  listColumn: ColumnType<any>[];
  isHideNumberRecord?: boolean;
  isHideCheckBox?: boolean;
  onClickBtn?: () => void;
  onSort?: (sort: string) => void;
  onPageChange?: (page_number: number, page_size: number) => void;
  listChecked?: (list: string[]) => void;
  isHidePaging?: boolean;
  nullListingType?: string;
  rowSelection?: TableProps<any>["rowSelection"];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

const DynamicList = (props: IDynamicListProps) => {
  const handleChangePage = (page_number: number, page_size: number) => {
    if (props.onPageChange) {
      props.onPageChange(page_number, page_size);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const onSelectChange = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (props.listChecked) {
      props.listChecked(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
      onSelectChange(newSelectedRowKeys as string[]);
    },
  };

  const onChange: TableProps<any>["onChange"] = (pagination, filters, sorter, extra) => {
    if (props.onSort) {
      if (typeof sorter === "string") {
        props.onSort(sorter);
      }
      // TODO
    }
  };

  // Tạo biến để lưu giá trị đầu và cuối của bản ghi
  const startIndex = props.pageNumber * props.pageSize + 1;
  const endIndex = Math.min(startIndex + props.pageSize - 1, props.totalCount);

  const paginationConfig = {
    current: props.pageNumber + 1,
    total: props.totalCount || 0,
    pageSize: props.pageSize,
    showSizeChanger: true,
    onShowSizeChange: (current: number, size: number) => {
      handleChangePage(current - 1, size);
    },
    onChange: (current: number, size: number) => {
      handleChangePage(current - 1, size);
    },
    style: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'-40px',
      marginLeft:'40px'
    }
    
  };

  return (
    <div>
      <Table
        rowKey={props.keyId}
        columns={props.listColumn}
        dataSource={props.listData}
        onChange={onChange}
        rowSelection={props.rowSelection ? rowSelection : undefined}
        scroll={{ y: 350 }}
        pagination={paginationConfig}
        footer={() => (
          <div style={{marginLeft:'18rem'}}>
            {`${startIndex} - ${endIndex} trong ${props.totalCount} bản ghi`}
          </div>
        )}
      />
    </div>
  );
};

export default DynamicList;
