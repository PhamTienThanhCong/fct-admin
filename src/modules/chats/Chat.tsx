import React, {useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomButton from '../../controllers/common/custombutton/CustomButton';
import { IoMdAdd } from 'react-icons/io';
import ModalComponent from '../../controllers/common/modal/BaseModal';
import { PiWarningFill } from 'react-icons/pi';
import {Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../layouts/components/Pagetitle';
import DynamicList from '../../controllers/common/customList/DynamicList';
import { RootState } from '../../config/store';
import { useDispatch, useSelector } from 'react-redux';
import ChatForm from './ChatForm';
import { showAlert } from '../../utils/showAlert';

const { Search } = Input;

interface UserRecord {
  id: string;
  name: string;
  country: string;
  description: string;
}

const fakeData = [
  [
    {
      "tag": "greeting",
      "patterns": ["Hi", "Hello", "Hey"],
      "responses": ["Hello! How can I help you today?", "Hi there! What can I do for you?"]
    },
    {
      "tag": "farewell",
      "patterns": ["Goodbye", "Bye", "See you later"],
      "responses": ["Goodbye! Have a great day.", "See you later!"]
    },
    {
      "tag": "thanks",
      "patterns": ["Thank you", "Thanks", "Appreciate it"],
      "responses": ["You're welcome!", "No problem, happy to help!"]
    },
    {
      "tag": "introduction",
      "patterns": ["Tell me about yourself", "Who are you"],
      "responses": ["I am a friendly chatbot ready to assist you.", "I'm a virtual assistant here to answer your questions."]
    }
  ]  
];


const Chat: React.FC = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearch, setIsSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<UserRecord | null>(null);

  const handleSubmit = async (values: any) => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: t('Tag'),
      dataIndex: 'tag',
      width: 150,
    },
    {
      title: t('patterns'),
      dataIndex: 'patterns',
      width: 250,
      render: (text: string, record: any) => (
        <span>{record.patterns.join(", ")}</span>
      ),
    },
    {
      title: t('responses'),
      dataIndex: 'responses',
      width: 450,
      render: (text: string, record: any) => (
        <span>{record.responses.join(", ")}</span>
      ),
    },
    {
      title: t('action'),
      className: 'action-column',
      dataIndex: 'action',
      render: (text: string, record: UserRecord) => (
        <div className="action-buttons-container">
          <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
          <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
        </div>
      ),
    },
  ];
  const handleEditUser = (record: UserRecord) => {
	setUserSelected(record);
	form.setFieldsValue(record);
	setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record: UserRecord) => {
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
	console.log('ok')
  };

  const onSearch = (value: any) => {
	// dispatch(toggleSetKeyword(value));
	// const params = {
	//   page: pageNumber + 1,
	//   size: pageSize,
	// };
	// dispatch(getListCarTypeAsync(params));
  };

return (
	<div className="wrapper_user">
	  <div className="item_user">
		<div className="header_table_user">
		  <PageTitle title={t('manage_question_and_answer')} />
		</div>
		<div className="form-search">
		  <Search
			placeholder={t('search')}
			allowClear
			enterButton
			size="large"
			onSearch={(e) => {
			  setPageNumber(0);
			  setPageSize(10);
			  setIsSearch(true);
			  onSearch(e);
			}}
		  />
		</div>
		{fakeData.map((data, index) => (
      <DynamicList
        keyId={index.toString()}
        listData={data}
        listColumn={columns}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={data.length}
        onPageChange={(pageNumber, pageSize) => {
          setPageNumber(pageNumber);
          setPageSize(pageSize);
        }}
      />
    ))}
		<div>
    <ModalComponent
      visible={isModalVisible}
      title={userSelected ? t('responses') : t('add_user')}
      onOk={() => form.submit()}
      width="48rem"
      onCancel={handelCancelCreateUser}
      okText={t('save')}
    >
      <Form
        form={form}
        name="validateOnly"
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
        className="form-add-edit"
      >
        <Form.Item name='id' hidden>
        <Input />
        </Form.Item>
        {fakeData.map((record, recordIndex) => (
      <ChatForm key={recordIndex} userId={userSelected ? userSelected.id : null} responseData={record} />
    ))}

      </Form>
    </ModalComponent>
    <ModalComponent
      title={t('delete_user')}
      visible={openModalDel}
      icon={<PiWarningFill className="icon-warning mt-2" />}
      onOk={handleDeleteUser}
      onCancel={() => setOpenModalDel(false)}
      okText={t('confirm')}
      hidenIconSubmit={true}
      >
      <p className="text-confirm text-lg text-center mb-10">{`${t('text_confirm_del')} ${userSelected?.name}  ${t('no')} ?`}</p>
    </ModalComponent>
		</div>
	  </div>
	</div>
  );

};

export default Chat;
