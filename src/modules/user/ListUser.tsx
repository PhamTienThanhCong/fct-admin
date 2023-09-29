import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserModal, { DataType } from "../../components/common/Modal";

const ListUser: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "25%",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: false,
      width: "25%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "25%",
      render: (_, record) => (
        <span className="action-btn-user">
          <Button
            style={{ marginRight: "10px" }}
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button type="default" onClick={() => showDeleteConfirm(record)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    // Khôi phục danh sách người dùng từ localStorage khi trang được nạp lại
    const storedData = localStorage.getItem("userList");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDataSource(parsedData);
    }
  }, []);

  const handleEdit = (user: DataType) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (user: DataType) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có muốn xóa người dùng "${user.name}" không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete(user);
      },
    });
  };

  const handleDelete = (user: DataType) => {
    try {
      const updatedDataSource = dataSource.filter((item) => item.key !== user.key);
      localStorage.setItem("userList", JSON.stringify(updatedDataSource));
      setDataSource(updatedDataSource);
      message.success("Xóa người dùng thành công");
    } catch (error) {
      message.error("Xóa người dùng thất bại");
    }
  };

  const handleAddUser = () => {
    setModalMode("add");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSaveUser = (values: DataType) => {
    if (modalMode === "add") {
      // Thêm người dùng mới vào mảng dataSource
      const newUser = { ...values, key: dataSource.length + 1 };
      const updatedDataSource = [...dataSource, newUser];
      // Lưu danh sách người dùng vào localStorage
      localStorage.setItem("userList", JSON.stringify(updatedDataSource));
      // Cập nhật dataSource và đóng modal
      setDataSource(updatedDataSource);
      setIsModalVisible(false);
      message.success("Thêm người dùng thành công");
    } else if (modalMode === "edit") {
      // Sửa người dùng
      const updatedDataSource = dataSource.map((item) =>
        item.key === values.key ? { ...item, ...values } : item
      );
      // Lưu danh sách người dùng vào localStorage
      localStorage.setItem("userList", JSON.stringify(updatedDataSource));
      // Cập nhật dataSource và đóng modal
      setDataSource(updatedDataSource);
      setIsModalVisible(false);
      message.success("Sửa người dùng thành công");
    }
  };
  

  return (
    <div className="content-userList">
      <div className="title-table-user">
        <h2>Danh sách người dùng</h2>
        <Button type="primary" onClick={handleAddUser}>
          Thêm Người Dùng
        </Button>
      </div>
      <div className="main-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: dataSource.length,
            showSizeChanger: true,
          }}
          onChange={(pagination) => {
            setPageNumber(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />
      </div>
      {isModalVisible && (
        <UserModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onAction={handleSaveUser}
          mode={modalMode}
          userData={selectedUser || undefined}
        />
      )}
    </div>
  );
};

export default ListUser;
