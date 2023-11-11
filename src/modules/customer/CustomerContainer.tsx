import React, { useEffect, useState } from "react";
import "../customer/CustomerContainer.scss";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { createCustomer, getCustomer } from "./api";
import { setLoadingStatus } from "../global/slices";
import { OBJECT_INPUT_CUSTOMER } from "../../constants/user";

const { Search } = Input;

const CustomerContainer: React.FC = () => {
    const { t } = useTranslation("translation");
    const dispatch = useAppDispatch();

    const rule_required = (name_lable: string) => {
        return {
            required: true,
            message: `${name_lable} cannot be empty`,
        };
    };

    const customers = useAppSelector((state) => state.customer.customers);
    const isFetching = useAppSelector((state) => state.customer.isFetching);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        if (!isFetching) {
            dispatch(getCustomer({}));
            dispatch(setLoadingStatus(false));
        } else {
            dispatch(setLoadingStatus(true));
        }
    }, [dispatch, isFetching]);

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            width: 50,
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
            title: "Birthday",
            dataIndex: "birthday",
            width: 200,
        },
        {
            title: "Card id",
            dataIndex: "card_id",
            width: 200,
        },
    ];

    const handleSubmit = async () => {
        dispatch(setLoadingStatus(true));
        const values = form.getFieldsValue();
        if (form.getFieldValue("id")) {
            await dispatch(createCustomer({ ...values, id: form.getFieldValue("id") }));
        } else {
            await dispatch(createCustomer(values));
        }
        handelCancelCreateUser();
        dispatch(setLoadingStatus(false));
    };

    const handelCancelCreateUser = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleAddUser = () => {
        setIsModalVisible(true);
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
                    listData={customers}
                    listColumn={columns}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalCount={customers.length}
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
                        <Form form={form} name="validateOnly" onFinish={handleSubmit} layout="vertical" autoComplete="off" className="form-add-edit">
                            <Row gutter={24}>
                                {OBJECT_INPUT_CUSTOMER.map((item) => (
                                    <Col span={12}>
                                        <Form.Item name={item.name} label={item.lable} rules={[rule_required(item.lable)]}>
                                            <Input placeholder={`Enter ${item.lable}`} />
                                        </Form.Item>
                                    </Col>
                                ))}
                                <Col span={12}>
                                    <Form.Item name={`password`} label={`Password`} rules={[rule_required("Password")]}>
                                        <Input.Password placeholder={`Enter Password`} />
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

export default CustomerContainer;
