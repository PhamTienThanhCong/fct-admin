import React from "react";
import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
interface VehicleFormProps {
	userId: number | null;
}

const VehicleManaForm: React.FC<VehicleFormProps> = ({ userId }) => {
  const { t } = useTranslation('translation');
  return(
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
          label={t("unit_name")}
          rules={[
            {
              required: true,
              whitespace: true,
              message: `${t("unit_name")}${t("not_empty")}`,
            },
            {
              max: 50,
              message: `${t("unit_name")}${t("name_too_long")}`,
            },
          ]}>
          <Input disabled={!!userId} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="address"
          label={t("address")}
          rules={[
            {
              required: true,
              whitespace: true,
              message: `${t("rule_user")}${t("not_empty")}`,
            },
            {
              max: 100,
              message: `${t("rule_user")}${t("name_too_long")}`,
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
  )
}
export default VehicleManaForm