import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

interface CarTypeFormProps {
	userId: number | null | undefined; 
}

const StationPortsForm: React.FC<CarTypeFormProps> = ({ userId }) => {
  const { t } = useTranslation('translation');

  return (
	  <Row gutter={24}>
       <Col span={12}>
        <Form.Item
          name="id"
          label={t('id')}
          rules={[
            {
            required: true,
            whitespace: true,
            message: `${t('id')}${t('not_empty')}`,
            },
            {
            max: 50,
            message: `${t('id')}${t('name_too_long')}`,
            },
          ]}
        >
			<Input />
		  </Form.Item>
		</Col>
    <Col span={12}>
        <Form.Item
          name="station_id"
          label={t('station_id')}
          rules={[
            {
            required: true,
            whitespace: true,
            message: `${t('station_id')}${t('not_empty')}`,
            },
            {
            max: 50,
            message: `${t('station_id')}${t('name_too_long')}`,
            },
          ]}
        >
			<Input />
		  </Form.Item>
		</Col>
		<Col span={12}>
		  <Form.Item
        name="port_code"
        label={t('port_code')}
        rules={[
          {
          required: true,
          whitespace: true,
          message: `${t('port_code')}${t('not_empty')}`,
          },
          {
          max: 50,
          message: `${t('port_code')}${t('name_too_long')}`,
          },
        ]}
		  >
			<Input disabled={!!userId}/>
		  </Form.Item>
		</Col>

		<Col span={12}>
		  <Form.Item
        name="price"
        label={t('price')}
        rules={[
          {
          required: true,
          whitespace: true,
          message: `${t('price')}${t('not_empty')}`,
          },
          {
          max: 50,
          message: `${t('price')}${t('name_too_long')}`,
          },
        ]}
		  >
			<Input />
		  </Form.Item>
		</Col>
		<Col span={12}>
		  <Form.Item
        name="power"
        label={t('power')}
        rules={[
          {
          required: true,
          whitespace: true,
          message: `${t('power')}${t('not_empty')}`,
          },
          {
          max: 200,
          message: `${t('power')}${t('name_too_long')}`,
          },
        ]}
		  >
			<Input />
		  </Form.Item>
		</Col>
    <Col span={12}>
		  <Form.Item
        name="status"
        label={t('status')}
        rules={[
          {
          required: true,
          whitespace: true,
          message: `${t('status')}${t('not_empty')}`,
          },
          {
          max: 200,
          message: `${t('status')}${t('name_too_long')}`,
          },
        ]}
		  >
			<Input />
		  </Form.Item>
		</Col>
	  </Row>
  );
};

export default StationPortsForm
    ;
