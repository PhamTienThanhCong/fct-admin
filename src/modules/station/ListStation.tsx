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
// import CarTypeForm from './CarTypeForm';
import { setLoadingStatus } from '../global/slices';
import ListStationForm from './ListStationForm';

const { Search } = Input;

interface UserRecord {
  name: string;
  description: string;
  address: string;
  local_x: number;
  local_y: number;
  phone: string;
  email: string;
  image: string;
  open_time: string; 
  close_time: string; 
  is_order: number;
  id: number;
  owner_id: number;
}

const ListStation: React.FC = () => {
  const { listCarType, keyword } = useSelector((state: RootState) => state.carType);
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
      title: "Tên",
      dataIndex: 'name',
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: 'description',
      width: 200,
    },
    {
      title: "Địa chỉ",
      dataIndex: 'address',
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: "Email",
      dataIndex: 'email',
      width: 150,
    },
    {
      title: "Đơn hàng",
      dataIndex: 'is_order',
      render: (text: number) => (text ? 'Có' : 'Không'),
      width: 150,
    },
    {
      title: "ID Chủ cửa hàng",
      dataIndex: 'owner_id',
      width: 150,
    },
    {
      title: "Hành động",
      dataIndex: 'action',
      render: (text: string, record: any) => (
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
    console.log('ol')
  };

  const onSearch = (value: any) => {
    console.log('ok')
  };

return (
    <div className="wrapper_user">
      <div className="item_user">
        <div className="header_table_user">
          <PageTitle title={t('list_station')} />
          <div style={{ marginBottom: '10px' }}>
            <CustomButton
              style={{ textAlign: 'center' }}
              type="primary"
              item={t('add_car_type')}
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
          listData={listCarType}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={listCarType.length}
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
              <Form.Item name='id' style={{ display: 'none' }}>
                <Input />
              </Form.Item>
              <ListStationForm userId={userSelected?.id || null} />
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

export default ListStation;
