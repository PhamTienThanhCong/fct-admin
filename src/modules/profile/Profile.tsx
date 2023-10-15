import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Col, Row, Table, Form, Input } from "antd";
import CustomButton from "../../controllers/common/custombutton/CustomButton";
import ModalComponent from "../../controllers/common/modal/BaseModal";
import AvatarImage from "../../assets/images/BgLoginImage.png";
import "../profile/Profile.scss";
import PageTitle from "../../layouts/components/Pagetitle";
import { useTranslation } from 'react-i18next'

const initialFormData = {
  username: "Vũ Thị Miên",
  email: "vuthimienhongthai@gmail.com",
  cmnd_cccd: "489483038580",
  phone: "04928581296",
};

const Profile = () => {
  const { t } = useTranslation('translation')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialFormData);

  const handleEdit = () => {
    setIsModalVisible(true);
    form.setFieldsValue(formData);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    console.log("Saving user information");
    form.validateFields().then((values) => {
      setFormData(values);
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Information",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSource = Object.keys(formData).map((key) => ({
    key: key,
    label: key,
    value: formData[key as keyof typeof formData],
  }));

  return (
    <div className="wrapper">
      <PageTitle title={t('profile')}/>
      <div className="avatar-profile">
        <img src={AvatarImage} alt="" />
        <h3>{formData.username}</h3>
      </div>
      <div className="info-account">
        <h3>{t('account_information')}</h3>
        <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} />
      </div>
      <div className="action-btn">
        <CustomButton
          type="primary"
          className="edit-link"
          item="Edit"
          icon={<EditOutlined />}
          onClick={handleEdit}
          style={{ marginRight: "10px", color: "#fff" }}
        />
      </div>
      <ModalComponent
        visible={isModalVisible}
        title={t('edit_user_information')}
        onOk={() => form.submit()}
        width="48rem"
        onCancel={handleCancelEdit}
        okText={t('save')}
      >
        <Form
          form={form}
          name="validateOnly"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          className="form-add-edit"
          initialValues={formData}
        >
          {dataSource.map((data) => (
            <Row gutter={24} key={data.key}>
              <Col span={12}>
                <Form.Item name={data.key} label={data.label}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      </ModalComponent>
    </div>
  );
};

export default Profile;
