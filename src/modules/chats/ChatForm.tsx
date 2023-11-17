import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

interface ChatFormProps {
  responseData?: any;
}

const ChatForm: React.FC<ChatFormProps> = ({ responseData }) => {
  const { t } = useTranslation('translation');
  const [form] = Form.useForm();
  useEffect(() => {
    if (responseData) {
      form.setFieldsValue(responseData);
    }
  }, [responseData]);


  return (
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item name="tag" label={t('Tag')}>
          <Input placeholder={t('enter_tag')} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="patterns" label={t('patterns')}>
          <Input placeholder={t('enter_patterns')} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="responses" label={t('responses')}>
          <Input placeholder={t('enter_responses')} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ChatForm;
