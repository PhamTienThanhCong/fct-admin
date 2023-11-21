import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import { PiWarningFill } from "react-icons/pi";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import DynamicList from "../../controllers/common/customList/DynamicList";
import { RootState } from "../../config/store";
import { useDispatch, useSelector } from "react-redux";
import ChatForm from "./ChatForm";
import { showAlert } from "../../utils/showAlert";
import { ChatPayload } from "../../types/chat/chat";
import { createChat, deleteChat, getChat, updateChat } from "./api";
import { deleteChatR } from "./slice";

const { Search } = Input;

const Chat: React.FC = () => {
    const { listchat, isFetching } = useSelector((state: RootState) => state.chat);
    const { t } = useTranslation("translation");
    const dispatch = useDispatch<any>();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [form] = Form.useForm();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isSearch, setIsSearch] = useState(false);
    const [userSelected, setUserSelected] = useState<ChatPayload | null>(null);

    useEffect(() => {
        if (!isSearch) {
            const params = {
                page: pageNumber + 1,
                size: pageSize,
            };
            dispatch(getChat(params));
        }
    }, [dispatch, pageNumber, pageSize, isSearch]);

    const handleSubmit = async (values: any) => {
        const params = {
            tag: values.tag,
            patterns: values.patterns,
            responses: values.responses,
        };
        if (params.tag === "" || !params.patterns || !params.responses) {
            showAlert("error", "Please fill in all fields", 3);
            return;
        }
        if (userSelected) {
            await dispatch(updateChat(params));
            showAlert("success", "create CarType successfully", 3);
        } else {
            showAlert("success", "create CarType successfully", 3);
            await dispatch(createChat(params));
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: t("Tag"),
            dataIndex: "tag",
            width: 150,
        },
        {
            title: t("patterns"),
            dataIndex: "patterns",
            width: 250,
            render: (text: string, record: any) => <span>{record.patterns ? record.patterns.join(", ") : ""}</span>,
        },
        {
            title: t("responses"),
            dataIndex: "responses",
            width: 450,
            render: (text: string, record: any) => <span>{record.responses ? record.responses.join(", ") : ""}</span>,
        },
        {
            title: t("action"),
            className: "action-column",
            dataIndex: "action",
            render: (text: string, record: ChatPayload) => (
                <div className="action-buttons-container">
                    <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
                    <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
                </div>
            ),
        },
    ];
    const handleEditUser = (record: ChatPayload) => {
        setUserSelected(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleOpenDeleteUser = (record: ChatPayload) => {
        setUserSelected(record);
        setOpenModalDel(true);
    };

    const handelCancelCreateUser = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleAddUser = () => {
        setUserSelected(null);
        setIsModalVisible(true);
    };

    const handleDeleteUser = async () => {
        if (userSelected){
            await dispatch(deleteChat(userSelected));
            dispatch(deleteChatR(userSelected));
            setOpenModalDel(false);
        }
    };

    return (
        <div className="wrapper_user">
            <div className="item_user">
                <div className="header_table_user">
                    <PageTitle title={t("manage_question_and_answer")} />
                    <div style={{ marginBottom: "10px" }}>
                        <CustomButton style={{ textAlign: "center" }} type="primary" item="Thêm mới" icon={<IoMdAdd fontSize={16} />} onClick={handleAddUser} />
                    </div>
                </div>
                <div className="form-search">
                    <Search
                        placeholder={t("search")}
                        allowClear
                        enterButton
                        size="large"
                        onSearch={(e) => {
                            setPageNumber(0);
                            setPageSize(10);
                            setIsSearch(true);
                        }}
                    />
                </div>
                <DynamicList
                    keyId="tag"
                    listData={listchat}
                    listColumn={columns}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalCount={listchat.length}
                    onPageChange={(pageNumber, pageSize) => {
                        setPageNumber(pageNumber);
                        setPageSize(pageSize);
                    }}
                />
                <div>
                    <ModalComponent
                        visible={isModalVisible}
                        title={userSelected ? "Sửa hội thoại" : "Thêm cuộc hội thoại"}
                        onOk={() => form.submit()}
                        width="48rem"
                        onCancel={handelCancelCreateUser}
                        okText={t("save")}
                    >
                        <Form form={form} name="validateOnly" onFinish={handleSubmit} layout="vertical" autoComplete="off" className="form-add-edit">
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
                            <ChatForm />
                        </Form>
                    </ModalComponent>
                    <ModalComponent
                        title={"Xóa đoạn chat"}
                        visible={openModalDel}
                        icon={<PiWarningFill className="icon-warning mt-2" />}
                        onOk={()=>handleDeleteUser()}
                        onCancel={() => setOpenModalDel(false)}
                        okText={"Xóa"}
                        hidenIconSubmit={true}
                    >
                        <p className="text-confirm text-lg text-center mb-10">{`Bạn có chắc chắn muốn xóa ${userSelected?.tag} không?`}</p>
                    </ModalComponent>
                </div>
            </div>
        </div>
    );
};

export default Chat;
