import React ,{useState}from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../users/UserContainer.scss'
import CustomButton from '../../controllers/common/custombutton/CustomButton';
import { IoMdAdd } from 'react-icons/io'
import ModalComponent from '../../controllers/common/modal/BaseModal';
import { PiWarningFill } from 'react-icons/pi'
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../layouts/components/Pagetitle';
import DynamicList from '../../controllers/common/customList/DynamicList';

const { Search } = Input
interface UserRecord {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const UserContainer: React.FC = () => {
  const { t } = useTranslation('translation')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [openModalDel, setOpenModalDel] = useState(false)
  const [form] = Form.useForm()
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  
  const data: UserRecord[] = [
    {
      key: '1',
      name: 'Edward King 1',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
    {
      key: '2',
      name: 'Edward King 2',
      age: 33,
      address: 'London, Park Lane no. 2',
    },
		{
      key: '3',
      name: 'Edward King 3',
      age: 33,
      address: 'London, Park Lane no. 3',
    },
		{
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '20',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
    {
      key: '20',
      name: 'Edward King 4',
      age: 33,
      address: 'London, Park Lane no. 4',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 300,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      className: 'action-column',
      dataIndex: 'action',
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

  const handleSubmit = () =>{
    console.log('submit')
  }
  const handleEditUser = (record: UserRecord) => {
    setIsModalVisible(true)
  };

  const handleOpenDeleteUser = (record: UserRecord) => {
    setOpenModalDel(true)
  };

  const handelCancelCreateUser = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const handleAddUser = () =>{
    setIsModalVisible(true)
  }
  const handleDeleteUser = () => {
    // TODO call api delete
    setOpenModalDel(false)
  }
  const onSearch = () => {
    console.log('ok')
  }

  return (
    <div className='wrapper_user'>
      <div className='item_user'>
        <div className='header_table_user'>
          <PageTitle title={t('list_user')}/>
          <div className='button-add-user'>
            <CustomButton
              style={{ textAlign: 'center' }}
              type='primary'
              item={t("add_user")}
              icon={<IoMdAdd fontSize={16} />}
              onClick={handleAddUser}
            />
          </div>
        </div>
        <div className='form-search'>
          <Search
            placeholder={t('search')}
            allowClear
            enterButton
            size='large'
            onSearch={(e) => {
              setIsSearch(true)
              setPageNumber(0)
              setPageSize(10)
              onSearch()
            }}
          />
      </div>
      <DynamicList
        keyId='key'
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

      <div>
        <ModalComponent
          visible={isModalVisible}
          title={t("add_user")}
          onOk={() => form.submit()}
          width='48rem'
          onCancel={handelCancelCreateUser}
          okText={t('save')}
        >
          <Form
            form={form}
            name='validateOnly'
            onFinish={handleSubmit}
            layout='vertical'
            autoComplete='off'
            className='form-add-edit'
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label={t('name')}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `${t('rule_user')}${t('not_empty')}`
                    },
                    {
                      max: 50,
                      message: `${t('rule_user')}${t('name_too_long')}`
                    }
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="age"
                  label={t('age')}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `${t('rule_user')}${t('not_empty')}`
                    },
                    {
                      max: 3,
                      message: `${t('rule_user')}${t('name_too_long')}`
                    }
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name='password'
                label={t('password')}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: `${t('password')}${t('not_empty')}`
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:t('not_empty')
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='mobile' label={t('phone_number')}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='address' label={t('address')}>
                <Input />
              </Form.Item>
            </Col>
            </Row>
          </Form>
        </ModalComponent>
        <ModalComponent
          title={t('delete_user')}
          visible={openModalDel}
          icon={<PiWarningFill className='icon-warning mt-2' />}
          onOk={() => form.submit()}
          onCancel={handleDeleteUser}
          okText={t('confirm')}
        >
          <p className='text-confirm text-lg text-center mb-10'>{t('confirm_delete_user')}</p>
        </ModalComponent>
      </div>
      </div>
    </div>
  );
}

export default UserContainer;
