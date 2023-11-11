import { Col, Form, Input, Row } from "antd";
import PageTitle from "../../layouts/components/Pagetitle";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../role/Role.scss";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { useEffect, useState } from "react";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import Search from "antd/es/input/Search";
import { RolePayload } from "../../types/roles";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { createRole, deleteRole, getRole, updateRole } from "./api";
import { setLoadingStatus } from "../global/slices";
import { removeRole } from "./slices";

const Role: React.FC = () => {
	const { t } = useTranslation("translation");
	const dispatch = useAppDispatch();

	const roles = useAppSelector((state) => state.role.Roles);
	const isFetching = useAppSelector((state) => state.role.isFetching);

	const [form] = Form.useForm();
	const [pageNumber, setPageNumber] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		if (!isFetching){
			dispatch(getRole({}));
			dispatch(setLoadingStatus(false))
		}else{
			dispatch(setLoadingStatus(true))
		}
	}, [dispatch, isFetching]);

	const columns = [
		{
			title: "id",
			dataIndex: "id",
			width: 100,
		},
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
		},
		{
			title: "Description",
			dataIndex: "description",
			width: 500,
		},
		{
			title: "Action",
			className: "action-column",
			dataIndex: "action",
			render: (text: string, record: RolePayload) => (
				<div className="action-buttons-container">
					<EditOutlined 
						className="icon-action-edit"
						onClick={() => editRow(record)}
					/>
					<DeleteOutlined className="icon-action-delete"
						onClick={() => deleteRow(record)}
					/>
				</div>
			),
		},
	];

	const editRow = async (record: RolePayload) => {
		await setIsModalVisible(true);
		form.setFieldsValue(record);
	}

	const deleteRow = async (record: RolePayload) => {
		if (window.confirm("Are you sure you want to delete this role?")) {
			dispatch(setLoadingStatus(true))
			let res = await dispatch(deleteRole(record));
			if (res.payload){
				dispatch(removeRole(record))
			}
			dispatch(setLoadingStatus(false))
		}
	}

	const handleAddRole = () => {
		setIsModalVisible(true);
	};

	const handelCancelCreateRole = () => {
		form.resetFields();
		setIsModalVisible(false);
	};
	const handleSubmit = async() => {
		dispatch(setLoadingStatus(true))
		if (form.getFieldValue("id")) {
			await dispatch(updateRole({...form.getFieldsValue(), id: form.getFieldValue("id")}));
		}else{
			await dispatch(createRole(form.getFieldsValue()));
		}
		dispatch(setLoadingStatus(false))
		setIsModalVisible(false);
		form.resetFields();
	};

	const onSearch = () => {
		console.log("ok");
	};

	return (
		<div className="wapper_role">
			<div className="content_role">
				<div className="item_role">
					<PageTitle title="Vai Trò" />
					<CustomButton type="primary" item={t("add_role")} icon={<IoMdAdd fontSize={16} />} onClick={handleAddRole} />
				</div>
				<div className="form-search">
					<Search
						placeholder={t("search")}
						allowClear
						enterButton
						size="large"
						onSearch={(e) => {
							// setIsSearch(true)
							setPageNumber(0);
							setPageSize(10);
							onSearch();
						}}
					/>
				</div>
				<DynamicList
					keyId="id"
					listData={roles}
					listColumn={columns}
					pageNumber={pageNumber}
					pageSize={pageSize}
					totalCount={roles.length}
					onPageChange={(pageNumber, pageSize) => {
						setPageNumber(pageNumber);
						setPageSize(pageSize);
					}}
				/>
				<div>
					<ModalComponent title={t("add_role")} visible={isModalVisible} onOk={() => form.submit()} onCancel={handelCancelCreateRole} okText={t("save")}>
						<Form form={form} name="validateOnly" onFinish={handleSubmit} layout="vertical" autoComplete="off" className="form-add-role">
							<Row gutter={24}>
								<Col span={24}>
									<Form.Item
										name="name"
										label={t("role")}
										rules={[
											{
												required: true,
												whitespace: true,
												message: `${t("role")}${t("not_empty")}`,
											},
											{
												max: 50,
												message: `${t("role")}${t("name_too_long")}`,
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								{/* textarea */}
								<Col span={24}>
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
												max: 500,
												message: `${t("description")}${t("name_too_long")}`,
											},
										]}
									>
										<Input.TextArea />
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</ModalComponent>
				</div>
			</div>
		</div>
	);
};
export default Role;
