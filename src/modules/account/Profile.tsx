import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { BsCheckLg } from "react-icons/bs";
import { useAppSelector } from "../../config/hooks";
import { useEffect } from "react";
import { updateUser } from "../users/api";
import { useDispatch } from "react-redux";
import { setLoadingStatus } from "../global/slices";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { t } = useTranslation("translation");
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (currentUser?.full_name) {
      form.setFieldsValue(currentUser);
      console.log(currentUser);
    }
  }, [form, currentUser]);

  const onFinishPersonalInfo = async () => {
    dispatch(setLoadingStatus(true));
    try {
      const values = await form.validateFields();
      if (values.id) {
        await dispatch(updateUser({ ...values, id: values.id }));
      }
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  return (
    <div className="profile">
      <Form form={form} layout="vertical" onFinish={onFinishPersonalInfo}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full m-0">
          <Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
            <Form.Item
              label={t("full_name")}
              name="full_name"
              className="w-full"
              rules={[{ required: true, message: t("full_name_required") }]}
            >
              <Input size="large" maxLength={50} />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
            <Form.Item label={t("title")} name="title" className="w-full">
              <Input size="large" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full">
          <Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
            <Form.Item label={t("email")} name="email" className="w-full">
              <Input size="large" disabled />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
            <Form.Item
              label={t("phone_number")}
              name="phone"
              className="w-full"
              rules={[
                {
                  pattern: /^(^\+84|^0)[1-9]\d(\d{4})(\d{3})$/,
                  message: t("phone_number_isvalid"),
                },
              ]}
            >
              <Input size="large" maxLength={15} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full">
          <Col className="gutter-row pr-0" span={12}>
            <Form.Item label={t("address")} name="address">
              <Input size="large" maxLength={255} />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" span={12}>
            <Form.Item label={t("role_id")} name="role_id">
              <Input size="large" maxLength={255} />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" span={12}>
            <Form.Item label={t("card_id")} name="card_id">
              <Input size="large" maxLength={255} />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" span={12}>
            <Form.Item label={t("password")} name="password">
              <Input.Password size="large" maxLength={50} />
            </Form.Item>
          </Col>
          <Col className="gutter-row pr-0" span={12}>
            <Form.Item label={t("description")} name="description">
              <Input size="large" maxLength={255} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full">
          <Col className="gutter-row pr-0" span={24}>
            <Form.Item>
              <CustomButton
                style={{ textAlign: "center" }}
                type="primary"
                item={<span className="button-save">{t("save")}</span>}
                size="large"
                icon={<BsCheckLg fontSize={16} />}
                htmlType="submit"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
