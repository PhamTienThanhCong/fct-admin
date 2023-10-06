import React ,{useState}from 'react';
import Table  from '../../controllers/common/table/Table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../users/UserContainer.scss'
import CustomButton from '../../controllers/common/custombutton/CustomButton';
import { IoMdAdd } from 'react-icons/io'
import ModalComponent from '../../controllers/common/modal/BaseModal';
import { PiWarningFill } from 'react-icons/pi'
import { Col, Form, Input, Row } from 'antd';
interface UserRecord {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const UserContainer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [openModalDel, setOpenModalDel] = useState(false)
  const [form] = Form.useForm()
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
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 200,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
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
  return (
    <div>
      <div className='button-add-user'>
        <CustomButton
          style={{ textAlign: 'center' }}
          type='primary'
          item="Thêm người dùng"
          icon={<IoMdAdd fontSize={16} />}
          onClick={handleAddUser}
        />
      </div>
      <Table
        columns={columns}
        data={data}
      />
      <div>
        <ModalComponent
          visible={isModalVisible}
          title='Thêm người dùng'
          onOk={() => form.submit()}
          width='48rem'
          onCancel={handelCancelCreateUser}
          okText="Lưu"
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
                  label="Tên đăng nhập"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `${'Tên người dùng hoặc địa chỉ email'}${'không được để trống'}`
                    },
                    {
                      max: 50,
                      message: `${'Tên người dùng hoặc địa chỉ email'}${'Tên quá dài'}`
                    }
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Tên đăng nhập"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `${'Tên người dùng hoặc địa chỉ email'}${'không được để trống'}`
                    },
                    {
                      max: 50,
                      message: `${'Tên người dùng hoặc địa chỉ email'}${'Tên quá dài'}`
                    }
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name='password'
                label='Mật khẩu'
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: `${'Mật khẩu'}${'không được để trống'}`
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Không được để trống'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='mobile' label='Số điện thoại'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='address' label='Địa chỉ'>
                <Input />
              </Form.Item>
            </Col>
            </Row>
          </Form>
        </ModalComponent>
        <ModalComponent
          title="Xóa người dùng"
          visible={openModalDel}
          icon={<PiWarningFill className='icon-warning mt-2' />}
          onOk={() => form.submit()}
          onCancel={handleDeleteUser}
          okText="Xác nhận"
        >
          <p className='text-confirm text-lg text-center mb-10'>Bạn có muốn xóa người dùng này không ?</p>
        </ModalComponent>
      </div>
    </div>
  );
}

export default UserContainer;
