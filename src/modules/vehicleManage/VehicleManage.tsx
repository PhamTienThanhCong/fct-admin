import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../users/UserContainer.scss";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import { PiWarningFill } from "react-icons/pi";
import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { getSescueServiceAsync } from "./slices";

const { Search } = Input;
interface UserRecord {
  name: string,
  phone: string,
  address: string,
  email: string,
  local_x: 0,
  local_y: 0,
  id: 0
}

const VehicleManage: React.FC = () => {
  const { listSescue , keyword } = useSelector((state: RootState) => state.vehicle);
	const { t } = useTranslation("translation");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [openModalDel, setOpenModalDel] = useState(false);
	const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
	const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch<any>()

	const columns = [
		{
			title: t("unit_name"),
			dataIndex: "name",
			width: 150,
		},
		{
			title: t("phone_number"),
			dataIndex: "phone",
			width: 150,
		},
		{
			title: t("address"),
			dataIndex: "address",
			width: 250,
		},
		{
			title: "Email",
			dataIndex: "email",
			width: 250,
		},
		{
			title: "Local X",
			dataIndex: "local_x",
			width: 150,
		},
		{
			title: "Local Y",
			dataIndex: "local_y",
			width: 150,
		},
		{
			title: t("action"),
			className: "action-column",
			dataIndex: "action",
			render: (text: string, record: UserRecord) => (
				<div className="action-buttons-container">
					<EditOutlined
						onClick={() => handleEditUser(record)}
						className="icon-action-edit"
					/>
					<DeleteOutlined
						onClick={() => handleOpenDeleteUser(record)}
						className="icon-action-delete"
					/>
				</div>
			),
		},
	];

  useEffect(()=>{
    if(!isSearch){
      const params = {
        page: pageNumber,
        size: pageSize
      }
      dispatch(getSescueServiceAsync(params))
    }
  },[dispatch,pageNumber,pageSize,isSearch])

	const handleSubmit = () => {
		console.log("submit");
	};
	const handleEditUser = (record: UserRecord) => {
		setIsModalVisible(true);
	};

	const handleOpenDeleteUser = (record: UserRecord) => {
		setOpenModalDel(true);
	};

	const handelCancelCreateUser = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	const handleAddUser = () => {
		setIsModalVisible(true);
	};
	const handleDeleteUser = () => {
		// TODO call api delete
		setOpenModalDel(false);
	};
	const onSearch = () => {
		console.log("ok");
	};

	return (
		<div className="wrapper_user">
			<div className="item_user">
				<div className="header_table_user">
					<PageTitle title={t("rescue_service")} />
					<div style={{ marginBottom: "10px" }}>
						<CustomButton
							style={{ textAlign: "center" }}
							type="primary"
							item={t("add_unit_service")}
							icon={<IoMdAdd fontSize={16} />}
							onClick={handleAddUser}
						/>
					</div>
				</div>
				<div className="form-search">
					<Search
						placeholder={t("search")}
						allowClear
						enterButton
						size="large"
						onSearch={(e) => {
							setIsSearch(true);
							setPageNumber(0);
							setPageSize(10);
							onSearch();
						}}
					/>
				</div>
				<DynamicList
					keyId="key"
					listData={listSescue?.data}
					listColumn={columns}
					pageNumber={pageNumber}
					pageSize={pageSize}
					totalCount={listSescue?.total_account}
					onPageChange={(pageNumber, pageSize) => {
						setPageNumber(pageNumber);
						setPageSize(pageSize);
					}}
				/>

				<div>
					<ModalComponent
						visible={isModalVisible}
						title={t("add_unit_service")}
						onOk={() => form.submit()}
						width="48rem"
						onCancel={handelCancelCreateUser}
						okText={t("save")}>
						<Form
							form={form}
							name="validateOnly"
							onFinish={handleSubmit}
							layout="vertical"
							autoComplete="off"
							className="form-add-edit">
							<Row gutter={24}>
								<Col span={12}>
									<Form.Item
										name="username"
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
										<Input />
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
												pattern:
													/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
												message: t("not_empty"),
											},
										]}>
										<Input.Password />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="mobile"
										label={t("phone_number")}
										rules={[
											{
												required: true,
												message: `${t("phone_number")} ${t("not_empty")}`,
											},
											{
												pattern: /^[0-9]+$/, 
												message: `${t("phone_number")} ${t(
													"must_be_number"
												)}`,
											},
										]}>
										<Input />
									</Form.Item>
								</Col>

								<Col span={12}>
									<Form.Item
										name="local_x"
										label={"Local X"}
										rules={[
											{
												required: true,
												message: `${t("local_x")} ${t("not_empty")}`,
											},
											{
												type: "number",
												message: `${t("local_x")} ${t("must_be_number")}`,
											},
										]}>
										<Input type="number" step="any" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="local_y"
										label={"Local Y"}
										rules={[
											{
												required: true,
												message: `${t("local_y")} ${t("not_empty")}`,
											},
											{
												type: "number",
												message: `${t("local_y")} ${t("must_be_number")}`,
											},
										]}>
										<Input type="number" step="any" />
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</ModalComponent>
					<ModalComponent
						title={t("delete_user")}
						visible={openModalDel}
						icon={<PiWarningFill className="icon-warning mt-2" />}
						onOk={() => form.submit()}
						onCancel={handleDeleteUser}
						okText={t("confirm")}>
						<p className="text-confirm text-lg text-center mb-10">
							{t("confirm_delete_user")}
						</p>
					</ModalComponent>
				</div>
			</div>
		</div>
	);
};

export default VehicleManage;
