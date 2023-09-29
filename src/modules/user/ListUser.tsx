import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const ListUser = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  // const dispatch = useDispatch<any>();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '25%', 
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: false,
      width: '25%', 
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '25%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '25%', 
      render: (_, record) => (
        <span className='action-btn-user'>
          <Button style={{marginRight:'10px'}} type='primary' onClick={() => handleEdit(record.key)}>
            Sửa
          </Button>
          <Button type='default' onClick={() => handleDelete(record.key)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
  ];

  // Xử lý sự kiện khi nhấn nút Sửa
  const handleEdit = (key: React.Key) => {
    console.log(`Sửa người dùng có key: ${key}`);
  };

  // Xử lý sự kiện khi nhấn nút Xóa
  const handleDelete = (key: React.Key) => {
    console.log(`Xóa người dùng có key: ${key}`);
  };

  return (
    <div className='content-userList'>
      <div className='title-table-user'>
        <h2>Danh sách người dùng</h2>
        <Button type='primary' onClick={() => navigate('/listUser')}>
          Thêm Người Dùng
        </Button>
      </div>
      <div className='main-container'>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: data.length,
            showSizeChanger: true,
          }}
          onChange={(pagination, filters, sorter) => {
            setPageNumber(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />
      </div>
    </div>
  );
};

export default ListUser;
