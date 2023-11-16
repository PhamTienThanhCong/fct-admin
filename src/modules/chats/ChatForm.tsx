import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

interface ChatFormProps {
  userId: string | null;
  responseData?: any;
}

const ChatForm: React.FC<ChatFormProps> = ({ userId, responseData }) => {
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
          <Input placeholder={t('enter_patterns')} disabled={!!userId} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="reply" label={t('reply')}>
          <Input.TextArea rows={4} placeholder={t('enter_reply')} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="responses" label={t('responses')}>
          <Input placeholder={t('enter_responses')} disabled={!!userId} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ChatForm;
