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
import PageTitle from '../../layouts/components/Pagetitle';
import { useTranslation } from 'react-i18next';

interface UserRecord {
  key: React.Key;
  name: string;
  time: Date;
  content: string;
}
const Notification: React.FC = () => {
  const { t } = useTranslation('translation')
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
      title: t('name'),
      dataIndex: 'name',
      width: 200,
    },
    {
      title: t('time'),
      dataIndex: 'time',
      width: 200,
			render: (text: string, record: UserRecord) => (
				<span>{moment(record.time).format('YYYY-MM-DD HH:mm:ss')}</span>
			),
    },
    {
      title: t('content'),
      dataIndex: 'content',
    },
    {
      title: t('action'),
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
		<div className='wrapper_noti'>
      <div className='item_noti'>
        <PageTitle title={t('notification')}/>
        <Table
          columns={columns}
          data={data}
        />
  			<div>
          <ModalComponent
            visible={isModalVisible}
            title={t('reply')}
            onOk={() => form.submit()}
            width='48rem'
            onCancel={handelCancelReply}
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
                    name="name"
                    label={t('name')}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
  							<Col span={12}>
  								<Form.Item name='time' label={t('time')}>
  									<Input />
  								</Form.Item>
  							</Col>
  							<Col span={12}>
  								<Form.Item name='content' label={t('content')}>
  									<Input />
  								</Form.Item>
  							</Col>
  							<Col span={24}>
                <Form.Item name='reply' label={t('reply')}>
                  <TextArea />
                </Form.Item>
              </Col>
              </Row>
            </Form>
          </ModalComponent>
  				<ModalComponent
            title={t('delete_user')}
            visible={openModalDel}
            icon={<PiWarningFill className='icon-warning' />}
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

export default Notification;