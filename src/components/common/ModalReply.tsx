import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export interface DataType {
    key: string;
    name: string;
    time: Date;
    content: string;
    reply: string[];
}

interface ModalReplyProps {
    visible: boolean;
    onCancel: () => void;
    onAction?: (values: DataType) => void;
    mode: "Reply";
    userData?: DataType;
}

const ModalReply: React.FC<ModalReplyProps> = ({ visible, onCancel, onAction, mode, userData }) => {
    const [form] = Form.useForm();
    const [initialUserData, setInitialUserData] = useState<DataType | undefined>(userData);

    const [formData, setFormData] = useState<DataType>({
        key: userData?.key || "",
        name: userData?.name || "",
        time: userData?.time || new Date(),
        content: userData?.content || "",
        reply: userData?.reply || [],
    });
    useEffect(()=>{
       if(visible && mode === "Reply" && initialUserData){
        setFormData(initialUserData);
        form.setFieldsValue(initialUserData);
       }
    },[])
    return (
        <Modal title="Reply" visible={visible} onCancel={onCancel}>
            <Form form={form} name="userForm">
                <Form.Item
                    name="name"
                    label="Name"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <Input value={formData.name} disabled />
                </Form.Item>
                <Form.Item
                    name="time"
                    label="Time"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <Input value={formData.time.toLocaleDateString()} disabled />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <TextArea value={formData.content} disabled />
                </Form.Item>
                <Form.Item
                    name="replyInput"
                    label="Reply"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}>
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalReply;
