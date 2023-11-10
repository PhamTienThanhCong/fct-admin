// CarTypeForm.tsx
import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
interface CarTypeFormProps {
	userId: string | null; 
}

const CarTypeForm: React.FC<CarTypeFormProps> = ({ userId }) => {
  const { t } = useTranslation('translation');

  return (
	  <Row gutter={24}>
		<Col span={12}>
		  <Form.Item
			name="name"
			label={t('name_car_type')}
			rules={[
			  {
				required: true,
				whitespace: true,
				message: `${t('name_car_type')}${t('not_empty')}`,
			  },
			  {
				max: 50,
				message: `${t('name_car_type')}${t('name_too_long')}`,
			  },
			]}
		  >
			<Input disabled={!!userId}/>
		  </Form.Item>
		</Col>

		<Col span={12}>
		  <Form.Item
			name="country"
			label={t('country')}
			rules={[
			  {
				required: true,
				whitespace: true,
				message: `${t('country')}${t('not_empty')}`,
			  },
			  {
				max: 50,
				message: `${t('country')}${t('name_too_long')}`,
			  },
			]}
		  >
			<Input />
		  </Form.Item>
		</Col>
		<Col span={12}>
		  <Form.Item
			name="description"
			label={t('description')}
			rules={[
			  {
				required: true,
				whitespace: true,
				message: `${t('description')}${t('not_empty')}`,
			  },
			  {
				max: 200,
				message: `${t('description')}${t('name_too_long')}`,
			  },
			]}
		  >
			<Input />
		  </Form.Item>
		</Col>
	  </Row>
  );
};

export default CarTypeForm;
