import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../users/UserContainer.scss";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import { PiWarningFill } from "react-icons/pi";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/store";
import { createVehicleAsync, deleteVehicleAsync, getSescueServiceAsync, toggleSetKeyword, updateVehicleAsync } from "./slices";
import VehicleManaForm from "./VehicleManaForm";
import { setLoadingStatus } from "../global/slices";

const { Search } = Input;
interface UserRecord {
  name: string,
  phone: string,
  address: string,
  email: string,
  local_x: number,
  local_y: number,
  id: number
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
  const [userSelected, setUserSelected] = useState<UserRecord | null>(null);

	const columns = [
    {
			title: t("id"),
			dataIndex: "id",
			width: 100,
		},
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

	const handleSubmit = async (values: UserRecord) => {
    const params = {
      id: values.name,
      name: values.name,
      phone: values.phone,
      address: values.address,
      email: values.email,
      local_x: values.local_x,
      local_y: values.local_x,
    }
    dispatch(toggleSetKeyword(true))
    if(userSelected){
      await dispatch(updateVehicleAsync({ id: userSelected.id, params }))
    }else{
      await dispatch(createVehicleAsync( params))
    }
    onSearch(keyword)
    setIsModalVisible(false);
    form.resetFields();
	};

	const handleEditUser = (record: UserRecord) => {
    dispatch(setLoadingStatus(true))
    setIsModalVisible(true);
    setUserSelected(record);
    form.setFieldsValue(record);
  };  

	const handleOpenDeleteUser = (record: UserRecord) => {
		setOpenModalDel(true);
    setUserSelected(record);
	};

	const handelCancelCreateUser = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	const handleAddUser = () => {
    setUserSelected(null);
		setIsModalVisible(true);
    form.resetFields();

	};
	const handleDeleteUser = async() => {
    dispatch(setLoadingStatus(true))
    if (userSelected) {
      await dispatch(deleteVehicleAsync(userSelected.id));
      setOpenModalDel(false);
    }
	};

	const onSearch = (value: any) => {
    dispatch(toggleSetKeyword(value));
    const params = {
      page: pageNumber + 1,
      size: pageSize,
    };
    dispatch(getSescueServiceAsync(params));
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
							onSearch(e);
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
            title={userSelected ? t('edit_unit_service') : t('add_unit_service')}
						onOk={() => form.submit()}
						width="48rem"
						onCancel={handelCancelCreateUser}
						okText={t("save")}
          >
						<Form
							form={form}
							name="validateOnly"
							onFinish={handleSubmit}
							layout="vertical"
							autoComplete="off"
							className="form-add-edit"
            >
              <Form.Item name='id' style={{ display: 'none' }}>
                <Input />
              </Form.Item>
							<VehicleManaForm userId={userSelected?.id || null}/>
						</Form>
					</ModalComponent>
					<ModalComponent
						title={t("delete_user")}
						visible={openModalDel}
						icon={<PiWarningFill className="icon-warning mt-2" />}
					  onOk={handleDeleteUser}
            onCancel={() => setOpenModalDel(false)}
						okText={t("confirm")}>
						<p className="text-confirm text-lg text-center mb-10">{`${t('text_confirm_del')} ${userSelected?.name}  ${t('no')} ?`}</p>
					</ModalComponent>
				</div>
			</div>
		</div>
	);
};

export default VehicleManage;
