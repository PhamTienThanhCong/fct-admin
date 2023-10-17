import { Col, Form, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { BsCheckLg } from "react-icons/bs";
import { useEffect } from "react";

const fakeData = {
	fullName: "John Doe",
	role: ["Admin", "User"],
	name: "john.doe",
	mobile: "0123456789",
	address: "123 Main Street, City, Country",
};
const fakeListRole = ["Admin", "User", "Manager", "Guest"];

const Profile = (props: any) => {
	const { t } = useTranslation("translation");
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(fakeData);
	}, [form]);

	const onFinishPersonalInfo = async (values: any) => {
		console.log("ok");
	};

	return (
		<div className="profile">
			<Form form={form} layout="vertical" onFinish={onFinishPersonalInfo}>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full m-0">
					<Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
						<Form.Item
							label={t("full_name")}
							name="fullName"
							className="w-full"
							rules={[{ min: 3, message: t("minimum_length_characters") }]}>
							<Input size="large" maxLength={50} />
						</Form.Item>
					</Col>
					<Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
						<Form.Item label={t("role")} name="role" className="w-full">
							<Select
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								size="large"
              >
								{fakeListRole.map((role) => (
									<Select.Option key={role} value={role}>
										{role}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="w-full">
					<Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
						<Form.Item label={t("name")} name="name" className="w-full">
							<Input size="large" disabled />
						</Form.Item>
					</Col>
					<Col className="gutter-row pr-0" xs={24} sm={24} md={12}>
						<Form.Item
							label={t("phone_number")}
							name="mobile"
							className="w-full"
							rules={[
								{
									pattern: /^(^\+84|^0)[1-9]\d(\d{4})(\d{3})$/,
									message: t("phone_number_isvalid"),
								},
							]}>
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
