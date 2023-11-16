import React, {useEffect, useState} from 'react';
import './comment.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { TbArrowForwardUp } from 'react-icons/tb';
import moment from 'moment';
import { Col, Form, Input, Row } from 'antd';
import ModalComponent from '../../controllers/common/modal/BaseModal';
import TextArea from 'antd/es/input/TextArea';
import { PiWarningFill } from 'react-icons/pi'
import PageTitle from '../../layouts/components/Pagetitle';
import { useTranslation } from 'react-i18next';
import DynamicList from '../../controllers/common/customList/DynamicList';
import { CommentPayload } from '../../types/comment/comment';
import { RootState } from '../../config/store';
import { useDispatch, useSelector } from 'react-redux';
import { getlistCommentAsync } from './slice';
 
interface CommentProps {
  station_id?: number; // Make station_id optional
}


const Comment = ({ station_id }: CommentProps) => {
  const { listComment, keyword } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch<any>();
  const { t } = useTranslation('translation')
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [openModalDel, setOpenModalDel] = useState(false)
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [station,setStation] = useState<number>(0);
  const [isSearch, setIsSearch] = useState(false);
  
  useEffect(() => {
    if (station_id) {
      dispatch(getlistCommentAsync(station_id));
    }
  }, [dispatch, station_id])

  const columns = [
    {
      title: t('id'),
      dataIndex: 'id',
      width: 100,
    },
    {
      title: t('created_at'),
      dataIndex: 'created_at',
      width: 150,
			render: (text: string, record: CommentPayload) => (
				<span>{moment(record.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
			),
    },
    {
      title: t('content'),
      dataIndex: 'content',
      width: 250,
    },
    {
      title: t('station_id'),
      dataIndex: 'station_id',
      width: 100,
    },
    {
      title: t('title'),
      dataIndex: 'title',
      width: 250,
    },
    {
      title: t('rating'),
      dataIndex: 'rating',
      width: 100,
    },
    {
      title: t('action'),
      className: 'action-column',
      width: 150,
      dataIndex: 'action',
      render: (text: string, record: CommentPayload) => (
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
	const handleOpenDeleteUser = (record: CommentPayload) => {
    setOpenModalDel(true)
  };

	const handleSubmit = () =>{
		console.log('submit')
	}
  const handelCancelReply = ()=>{
		form.resetFields()
    setIsModalVisible(false)
	}
	const handleReply = (record: CommentPayload)=>{
		setIsModalVisible(true)
	}
	const handleDelete = (record: CommentPayload)=>{
		setIsModalVisible(true)
	}

	return (
		<div className='wrapper_noti'>
      <div className='item_noti'>
        <PageTitle title={t('notification')}/>
        <DynamicList
          keyId='key'
          listData={listComment}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={listComment.length}
          onPageChange={(pageNumber, pageSize) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
          }}
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

export default Comment;