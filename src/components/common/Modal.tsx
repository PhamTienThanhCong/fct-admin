import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";

export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

interface UserModalProps {
    visible: boolean;
    onCancel: () => void;
    onAction: (values: DataType) => void;
    mode: "add" | "edit" | "delete" | "Reply";
    userData?: DataType;
}

const UserModal: React.FC<UserModalProps> = ({ visible, onCancel, onAction, mode, userData }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<DataType>({
        key: userData?.key || "",
        name: "",
        age: 0,
        address: "",
    });

    // Lưu thông tin người dùng ban đầu
    const [initialUserData, setInitialUserData] = useState<DataType | undefined>(userData);

    useEffect(() => {
        // Khi modal mở và chế độ là "edit," sử dụng thông tin người dùng ban đầu để khởi tạo formData
        if (visible && mode === "edit" && initialUserData) {
            setFormData(initialUserData);
            form.setFieldsValue(initialUserData);
        } else {
            // Khi modal đóng hoặc chế độ không phải "edit," reset formData và form
            setFormData({
                key: userData?.key || "",
                name: "",
                age: 0,
                address: "",
            });
            form.resetFields();
        }
    }, [visible, mode, initialUserData, form, userData]);

    const handleAddUser = () => {
        form.validateFields().then(() => {
            onCancel();
            onAction(formData);
        });
    };

    return (
        <Modal
            title={mode === "add" ? "Thêm Người Dùng" : "Sửa Người Dùng"}
            visible={visible}
            onOk={handleAddUser}
            onCancel={onCancel}>
            <Form form={form} name="userForm" initialValues={formData}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item name="age" label="Age" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                    <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
