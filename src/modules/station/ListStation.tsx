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
import ListStationForm from './ListStationForm';
import { StationRecord } from '../../types/station/station';
import { createStationAsync, deleteStationAsync, getListStationAsync, updateStationAsync } from './slices';
import { toggleSetKeyword } from '../station/slices'
import { showAlert } from '../../utils/showAlert';

const { Search } = Input;

const ListStation: React.FC = () => {
  const { listStation, keyword } = useSelector((state: RootState) => state.station);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearch, setIsSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<StationRecord | null>(null);

  const handleSubmit = async (values: any) => {
    const params = {
      name: values.name,
      description: values.description,
      address: values.address,
      local_x: values.local_x,
      local_y: values.local_y,
      phone: values.phone,
      email: values.email,
      image: values.image,
      open_time: values.open_time, 
      close_time: values.close_time, 
      is_order: values.is_order,
      id: values.id,
      owner_id: values.owner_id,
    }
    if(userSelected){
      await dispatch(updateStationAsync({id : userSelected.id, params}))
      showAlert("success", "create CarType successfully", 3);
    }else {
      await dispatch(createStationAsync(params))
      showAlert("success", "create CarType successfully", 3);
    }
    onSearch(keyword)
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(()=>{
    if(!isSearch){
      const params = {
        page: pageNumber + 1,
        size: pageSize,
      }
      dispatch(getListStationAsync(params))
    }
  },[dispatch,pageNumber,pageSize,isSearch])
  

  const columns = [
    {
      title: "id",
      dataIndex: 'id',
      width: 100,
    },
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
  const handleEditUser = (record: StationRecord) => {
    setUserSelected(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record: StationRecord) => {
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
    try {
      if (userSelected) {
        await dispatch(deleteStationAsync(userSelected.id));
        setOpenModalDel(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSearch = (value: any) => {
    dispatch(toggleSetKeyword(value))
    const params = {
      page: pageNumber + 1,
      size: pageSize,
    };
    dispatch(getListStationAsync(params))
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
            item={t('add_station')}
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
        listData={listStation}
        listColumn={columns}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={listStation.length}
        onPageChange={(pageNumber, pageSize) => {
          setPageNumber(pageNumber);
          setPageSize(pageSize);
        }}
      />
      <div>
        <ModalComponent
          visible={isModalVisible}
          title={userSelected ? t('edit_station') : t('add_station')}
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
            <ListStationForm userId={userSelected ? userSelected.id : null} initialImageUrl={userSelected ? userSelected.image : null} />
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
