import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface ChatFormProps {
    responseData?: any;
}

const ChatForm: React.FC<ChatFormProps> = ({ responseData }) => {
    const { t } = useTranslation("translation");
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item name="tag" label={t("Tag")}>
                    <Input placeholder={t("tag")} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <label>{t("patterns")}</label>
                <Form.List name="patterns">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Form.Item {...restField} name={name} rules={[{ required: true, message: "Missing patterns" }]}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input placeholder={t("patterns")} style={{ marginRight: '8px' }} />
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </div>
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm trường
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Col>
            <Col span={24}>
                <label>{t("responses")}</label>
                <Form.List name="responses">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                 <Form.Item {...restField} name={name} rules={[{ required: true, message: "Missing patterns" }]}>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                     <Input placeholder={t("responses")} style={{ marginRight: '8px' }} />
                                     <MinusCircleOutlined onClick={() => remove(name)} />
                                 </div>
                             </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm trường
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
};

export default ChatForm;
