import React, {useState} from 'react';
import '../notification/Notification.scss';
import Table  from '../../controllers/common/table/Table';
import { DeleteOutlined } from '@ant-design/icons';
import { TbArrowForwardUp } from 'react-icons/tb';
import moment from 'moment';
import { Col, Form, Input, Row } from 'antd';
import ModalComponent from '../../controllers/common/modal/BaseModal';
import TextArea from 'antd/es/input/TextArea';
import { PiWarningFill } from 'react-icons/pi'

interface UserRecord {
  key: React.Key;
  name: string;
  time: Date;
  content: string;
}
const Notification: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [openModalDel, setOpenModalDel] = useState(false)
  const [form] = Form.useForm()
  const data: UserRecord[] = [
    {
      key: '1',
      name: 'Notification 1',
      time: new Date(2023, 9, 10, 14, 30),
      content: 'Nội dung thông báo 1',
    },
    {
      key: '2',
      name: 'Notification 2',
      time: new Date(2023, 9, 10, 14, 30),
      content: 'Nội dung thông báo 2',
    },
    {
      key: '3',
      name: 'Notification 3',
      time: new Date(2023, 9, 10, 14, 30),
      content: 'Nội dung thông báo 3',
    },
    {
      key: '4',
      name: 'Notification 4',
      time: new Date(2023, 9, 10, 14, 30),
      content: 'Nội dung thông báo 4',
    },
  ];
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: 200,
			render: (text: string, record: UserRecord) => (
				<span>{moment(record.time).format('YYYY-MM-DD HH:mm:ss')}</span>
			),
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: UserRecord) => (
        <div className="action-buttons-container">
            <TbArrowForwardUp
              onClick={() => handleReply(record)}
              className="icon-action-reply"
							style={{fontSize:'20px'}}
            />
            <DeleteOutlined
              onClick={() => handleOpenDeleteUser(record)}
              className="icon-action-delete"
            />
        </div>
      ),
    },
  ];

	const handleDeleteUser = () => {
    // TODO call api delete
    setOpenModalDel(false)
  }
	const handleOpenDeleteUser = (record: UserRecord) => {
    setOpenModalDel(true)
  };

	const handleSubmit = () =>{
		console.log('submit')
	}
  const handelCancelReply = ()=>{
		form.resetFields()
    setIsModalVisible(false)
	}
	const handleReply = (record: UserRecord)=>{
		setIsModalVisible(true)
	}
	const handleDelete = (record: UserRecord)=>{
		setIsModalVisible(true)
	}

	return (
		<div>
      <Table
        columns={columns}
        data={data}
      />
			<div>
        <ModalComponent
          visible={isModalVisible}
          title='Trả lời'
          onOk={() => form.submit()}
          width='48rem'
          onCancel={handelCancelReply}
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
                >
                  <Input/>
                </Form.Item>
              </Col>
							<Col span={12}>
								<Form.Item name='time' label='Thời gian'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name='content' label='Nội dung'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={24}>
              <Form.Item name='reply' label='Trả lời'>
                <TextArea />
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

export default Notification;