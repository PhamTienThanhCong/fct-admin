import moment from "moment";
import React from "react";
import { Col, Form, Input, Row, DatePicker, Switch } from "antd";
import { useTranslation } from "react-i18next";
const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface ListStationFormProps {
	userId: number | null;
}

const ListStationForm: React.FC<ListStationFormProps> = ({ userId }) => {
	const { t } = useTranslation("translation");

	return (
		<Row gutter={24}>
      <Col span={12}>
				<Form.Item
					name="id"
					label={t("id")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("id")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("id")}${t("name_too_long")}`,
						},
					]}>
					<Input disabled={!!userId} />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="name"
					label={t("name_car_type")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("name_car_type")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("name_car_type")}${t("name_too_long")}`,
						},
					]}>
					<Input disabled={!!userId} />
				</Form.Item>
			</Col>

			<Col span={12}>
				<Form.Item
					name="description"
					label={t("description")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("description")}${t("not_empty")}`,
						},
						{
							max: 200,
							message: `${t("description")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>

			<Col span={12}>
				<Form.Item
					name="image"
					label={t("image")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("image")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("image")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>

      <Col span={12}>
        <Form.Item
          name="email"
          label={t("email")}
          rules={[
            {
              required: true,
              whitespace: true,
              message: `${t("email")}${t("not_empty")}`,
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: `${t("email")} ${t("invalid_format")}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label={t("phone_number")}
          rules={[
            {
              required: true,
              message: `${t("phone_number")} ${t("not_empty")}`,
            },
            {
              pattern: /^[0-9]+$/,
              message: `${t("phone_number")} ${t("must_be_number")}`,
            },
          ]}>
          <Input />
        </Form.Item>
      </Col>

			<Col span={12}>
				<Form.Item
					name="open_time"
					label={t("open_time")}
					rules={[
						{
							required: true,
							message: `${t("open_time")}${t("not_empty")}`,
						},
					]}>
					<DatePicker
						showTime
						format={dateFormat}
						style={{ width: "100%" }}
					/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="close_time"
					label={t("close_time")}
					rules={[
						{
							required: true,
							message: `${t("close_time")}${t("not_empty")}`,
						},
					]}>
					<DatePicker
						showTime
						format={dateFormat}
						style={{ width: "100%" }}
					/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="is_order"
					label={t("is_order")}
					rules={[
						{
							required: true,
							message: `${t("is_order")}${t("not_empty")}`,
						},
					]}>
					<Switch />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="owner_id"
					label={t("owner_id")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("owner_id")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("owner_id")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>
      <Col span={12}>
        <Form.Item
          name="local_x"
          label={t("local_x")}
          rules={[
            {
              required: true,
              message: `${t("local_x")} ${t("not_empty")}`,
            },
            {
              type: "number",
              message: `${t("local_x")} ${t("must_be_number")}`,
              transform: (value) => (value ? Number(value) : undefined),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="local_y"
          label={t("local_y")}
          rules={[
            {
              required: true,
              message: `${t("local_y")} ${t("not_empty")}`,
            },
            {
              type: "number",
              message: `${t("local_y")} ${t("must_be_number")}`,
              transform: (value) => (value ? Number(value) : undefined),
            },
          ]}
        >
        <Input />
      </Form.Item>
    </Col>
		</Row>
	);
};

export default ListStationForm;
