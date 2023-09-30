import React from "react";
import { Modal } from "antd";
import { DataType } from "./Modal";

interface DeleteConfirmModalProps {
  visible: boolean;
  user: DataType | null;
  onCancel: () => void;
  onConfirm: (user: DataType) => void; // Thêm tham số user vào hàm onConfirm
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  user,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onOk={() => onConfirm(user!)} // Truyền user vào hàm onConfirm
      onCancel={onCancel}
      okText="Xóa"
      okType="danger"
      cancelText="Hủy"
    >
      {user && (
        <p>Bạn có muốn xóa người dùng "<span style={{color:'red'}}>{user.name}</span>" không? 🤔</p>
      )}
    </Modal>
  );
};

export default DeleteConfirmModal;
