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
import { createUser, getUser } from "./api";
import { setLoadingStatus } from "../global/slices";
import { getRole } from "../role/api";

const { Search } = Input;

const UserContainer: React.FC = () => {
    const { Option } = Select;
    const { t } = useTranslation("translation");
    const dispatch = useAppDispatch();

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

    const userSelectedRef = React.useRef<IUser | null>(null);

    useEffect(() => {
        if (!isFetching) {
            dispatch(getUser({}));
            dispatch(setLoadingStatus(false));
        } else {
            dispatch(setLoadingStatus(true));
        }
    }, [dispatch, isFetching]);

    useEffect(() => {
        if (!isFetchingRole){
            dispatch(getRole({}));
            dispatch(setLoadingStatus(false))
        }else{
            dispatch(setLoadingStatus(true))
        }
    }, [dispatch, isFetchingRole]);

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "role id",
            dataIndex: "role_id",
            width: 100,
        },
        {
            title: "Name",
            dataIndex: "full_name",
            width: 300,
        },
        {
            title: "Phone",
            dataIndex: "phone",
            width: 300,
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 300,
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Action",
            className: "action-column",
            dataIndex: "action",
            render: (text: string, record: IUser) => (
                <div className="action-buttons-container">
                    <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
                    <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
                </div>
            ),
        },
    ];

    const handleSubmit = async() => {
        dispatch(setLoadingStatus(true));
        const values = form.getFieldsValue();
        if (form.getFieldValue("id")) {
            await dispatch(createUser({...values, id: form.getFieldValue("id")}));
        }else{
            await dispatch(createUser(values));
        }
        handelCancelCreateUser()
        dispatch(setLoadingStatus(false));
    };
    const handleEditUser = (record: IUser) => {
        setIsModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleOpenDeleteUser = (record: IUser) => {
        setOpenModalDel(true);
        userSelectedRef.current = record;
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
                    <PageTitle title={t("list_user")} />
                    <div style={{ marginBottom: "10px" }}>
                        <CustomButton style={{ textAlign: "center" }} type="primary" item={t("add_user")} icon={<IoMdAdd fontSize={16} />} onClick={handleAddUser} />
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
                    <ModalComponent visible={isModalVisible} title={form.getFieldValue("id") ? t("edit_user") : t("add_user")} onOk={() => form.submit()} width="48rem" onCancel={handelCancelCreateUser} okText={t("save")}>
                        <Form form={form} name="validateOnly" onFinish={handleSubmit} layout="vertical" autoComplete="off" className="form-add-edit">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Email cannot be empty",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="full_name"
                                        label="Full Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Full Name cannot be empty",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Password cannot be empty",
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phone" label="Phone">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="address" label="Address">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="card_id" label="Card ID">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="title" label="Title">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    {/* form select */}
                                    <Form.Item name="role_id" label="Role">
                                    <Select placeholder="Select a role">
                                        {roles.map(role => (
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
                    <ModalComponent
                        title={t("delete_user")}
                        visible={openModalDel}
                        icon={<PiWarningFill className="icon-warning mt-2" />}
                        onOk={() => form.submit()}
                        onCancel={handleDeleteUser}
                        okText={t("confirm")}
                    >
                        <p className="text-confirm text-lg text-center mb-10">{t("confirm_delete_user")}</p>
                    </ModalComponent>
                </div>
            </div>
        </div>
    );
};

export default UserContainer;
