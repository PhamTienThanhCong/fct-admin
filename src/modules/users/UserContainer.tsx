import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../users/UserContainer.scss";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import { PiWarningFill } from "react-icons/pi";
import { Col, Form, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { IUser } from "../../types/users";
import { createUser, deleteUser, getUser, updateUser } from "./api";
import { setLoadingStatus } from "../global/slices";
import { getRole } from "../role/api";
import { OBJECT_INPUT } from "../../constants/user";
import { _deleteUser } from "./slices";

const { Search } = Input;

const UserContainer: React.FC = () => {
  const { Option } = Select;
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();

  const rule_required = (name_lable: string) => {
    return {
      required: true,
      message: `${name_lable} cannot be empty`,
    };
  };

  const users = useAppSelector((state) => state.user.users);
  const isFetching = useAppSelector((state) => state.user.isFetching);
  const roles = useAppSelector((state) => state.role.Roles);
  const isFetchingRole = useAppSelector((state) => state.role.isFetching);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  const userSelectedRef = React.useRef<number>(0);

  useEffect(() => {
    if (!isFetching) {
      dispatch(getUser({}));
      dispatch(setLoadingStatus(false));
    } else {
      dispatch(setLoadingStatus(true));
    }
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (!isFetchingRole) {
      dispatch(getRole({}));
      dispatch(setLoadingStatus(false));
    } else {
      dispatch(setLoadingStatus(true));
    }
  }, [dispatch, isFetchingRole]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "role id",
      dataIndex: "role_id",
      width: 75,
    },
    {
      title: "Name",
      dataIndex: "full_name",
      width: 220,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 220,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 350,
    },
    {
      title: "Action",
      className: "action-column",
      dataIndex: "action",
      render: (text: string, record: IUser) => (
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
      with: 100,
    },
  ];

  const handleSubmit = async () => {
    dispatch(setLoadingStatus(true));
    const values = form.getFieldsValue();
    if (form.getFieldValue("id")) {
      await dispatch(updateUser({ ...values, id: form.getFieldValue("id") }));
    } else {
      await dispatch(createUser(values));
    }
    handelCancelCreateUser();
    dispatch(setLoadingStatus(false));
  };
  
  const handleEditUser = (record: IUser) => {
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleOpenDeleteUser = (record: IUser) => {
    setOpenModalDel(true);
    userSelectedRef.current = record.id;
  };

  const handelCancelCreateUser = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
  };
  const handleDeleteUser = async () => {
    if (userSelectedRef.current) {
      dispatch(setLoadingStatus(true));
      await dispatch(deleteUser(userSelectedRef.current));
      dispatch(_deleteUser(userSelectedRef.current));
      dispatch(setLoadingStatus(false));
    }
    setOpenModalDel(false);
  };
  const onSearch = (value: string) => {
    setIsSearch(true);
    setPageNumber(0);
    setPageSize(10);
    dispatch(getUser({ search: value }));
  };

  return (
    <div className="wrapper_user">
      <div className="item_user">
        <div className="header_table_user">
          <PageTitle title={t("list_user")} />
          <div style={{ marginBottom: "10px" }}>
            <CustomButton
              style={{ textAlign: "center" }}
              type="primary"
              item={t("add_user")}
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
            onSearch={onSearch}
          />
        </div>
        <DynamicList
          keyId="id"
          listData={users}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={users.length}
          onPageChange={(pageNumber, pageSize) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
          }}
        />

        <div>
          <ModalComponent
            visible={isModalVisible}
            title={form.getFieldValue("id") ? t("edit_user") : t("add_user")}
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
              <Row gutter={24}>
                {OBJECT_INPUT.map((item) => (
                  <Col span={12}>
                    <Form.Item name={item.name} label={item.lable} rules={[rule_required(item.lable)]} >
                      <Input placeholder={`Enter ${item.lable}`} />
                    </Form.Item>
                  </Col>
                ))}
                <Col span={12}>
                    <Form.Item name={`password`} label={`Password`} rules={[rule_required("Password")]} >
                      <Input.Password placeholder={`Enter Password`} />
                    </Form.Item>
                  </Col>
                <Col span={12}>
                  <Form.Item
                    name="role_id"
                    label="Role"
                    rules={[rule_required("Role")]}
                  >
                    <Select placeholder="Select a role">
                      {roles.map((role) => (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label={t("description")}
                    rules={[rule_required("Role")]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ModalComponent>
          <ModalComponent
            title={t("delete_user")}
            visible={openModalDel}
            icon={<PiWarningFill className="icon-warning mt-2" />}
            onOk={() => handleDeleteUser()}
            onCancel={() => setOpenModalDel(false)}
            okText={t("confirm")}
          >
            <p className="text-confirm text-lg text-center mb-10">
              {t("confirm_delete_user")}
            </p>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
