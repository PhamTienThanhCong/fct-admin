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
import OrderForm from './OrderForm';
import { showAlert } from '../../utils/showAlert';
import { OrderPayload } from '../../types/order/order';
import { getListOrderAsync } from './slice';

const { Search } = Input;

const Order: React.FC = () => {
  const { listOrder, keyword } = useSelector((state: RootState) => state.order);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearch, setIsSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<OrderPayload | null>(null);

  useEffect(()=>{
    if(!isSearch){
      const params = {
        page: pageNumber + 1,
        size: pageSize,
      }
      dispatch(getListOrderAsync(params)) 
    }
  })

  const columns = [
	{
	  title: t('Mã xe'),
	  dataIndex: 'id',
	  width: 80,
	},
	{
	  title: t('customer_id'),
	  dataIndex: 'customer_id',
	  width: 120,
	},
	{
	  title: t('charging_port_id'),
	  dataIndex: 'charging_port_id',
	  width: 120,
	},
	{
	  title: t('Trạng thái'),
	  dataIndex: 'status',
	  width: 100,
	},
	{
	  title: t('Thời gian bắt đầu'),
	  dataIndex: 'start_time',
	  width: 150,
	},
	{
	  title: t('Thời gian kết thúc'),
	  dataIndex: 'end_time',
	  width: 150,
	},
	{
	  title: t('Tổng giá'),
	  dataIndex: 'total_price',
	  width: 150,
	},
	{
	  title: t('Tổng thời gian'),
	  dataIndex: 'total_time',
	  width: 150,
	},
	{
	  title: t('Ngày tạo'),
	  dataIndex: 'created_at',
	  width: 150,
	},
	{
	  title: t('Hành động'),
	  className: 'action-column',
	  dataIndex: 'action',
	  width: 100,
	  render: (text: string, record: OrderPayload) => (
		<div className="action-buttons-container">
		  <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
		  <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
		</div>
	  ),
	},
  ];
  
  const handleSubmit = async (values: any) => {
    onSearch(keyword)
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEditUser = (record:OrderPayload) => {
	setUserSelected(record);
	form.setFieldsValue(record);
	setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record:OrderPayload) => {
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
	console.log('ok')
  };

return (
	<div className="wrapper_user">
	  <div className="item_user">
		<div className="header_table_user">
		  <PageTitle title={t('list_car_type')} />
		  <div style={{ marginBottom: '10px' }}>
			<CustomButton
			  style={{ textAlign: 'center' }}
			  type="primary"
			  item={t('order')}
			  icon={<IoMdAdd fontSize={16} />}
			  onClick={handleAddUser}
			/>
		  </div>
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
		<DynamicList
		  keyId="id"
		  listData={listOrder}
		  listColumn={columns}
		  pageNumber={pageNumber}
		  pageSize={pageSize}
		  totalCount={listOrder.length}
		  onPageChange={(pageNumber, pageSize) => {
			setPageNumber(pageNumber);
			setPageSize(pageSize);
		  }}
		/>
		<div>
		  <ModalComponent
			visible={isModalVisible}
			title={userSelected ? t('edit_user') : t('add_user')}
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
        <OrderForm userId={userSelected ? String(userSelected.id) : null} />
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
        <p className="text-confirm text-lg text-center mb-10">{`${t('text_confirm_del')} ${userSelected?.customer.full_name}  ${t('no')} ?`}</p>
      </ModalComponent>

		</div>
	  </div>
	</div>
  );

};

export default Order;
