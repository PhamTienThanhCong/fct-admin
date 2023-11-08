// src/modules/carType/CarType.tsx
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomButton from '../../controllers/common/custombutton/CustomButton';
import { IoMdAdd } from 'react-icons/io';
import ModalComponent from '../../controllers/common/modal/BaseModal';
import { PiWarningFill } from 'react-icons/pi';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../layouts/components/Pagetitle';
import DynamicList from '../../controllers/common/customList/DynamicList';
import { RootState } from '../../config/store';
import { useDispatch, useSelector } from 'react-redux';
import { createCarTypeAsync, getListCarTypeAsync, toggleSetKeyword, updateCarTypeAsync } from './slices';
import { updateCarType } from './api';
import { isSuccessApi } from '../../utils/sendRequest';
import { setMessageText, setSeverity } from '../global/slices';

const { Search } = Input;

interface UserRecord {
  id?:any ;
  name: string;
  country: string;
  description: string;
}

const CarType: React.FC = () => {
  const { listCarType, keyword } = useSelector((state: RootState) => state.carType);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isSearch, setIsSearch] = useState(false)
  const [userSelected, setUserSelected] = useState<any>()

  useEffect(()=>{
    if(!isSearch){
      const params = {
        page: pageNumber + 1,
        size: pageSize
      }
      dispatch(getListCarTypeAsync(params))
    }
  },[dispatch,pageNumber,pageSize,isSearch])

  const columns = [
    {
      title: t('name_car_type'),
      dataIndex: 'name',
      width: 250,
    },
    {
      title: t('country'),
      dataIndex: 'country',
      width: 250,
    },
    {
      title: t('description'),
      dataIndex: 'description',
      width: 450,
    },
    {
      title: t('action'),
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

  const handleSubmit = async(values: UserRecord) => {
    let res = null
    if(values?.id){
      res = await dispatch(updateCarTypeAsync(values))
    }else{
      res = await dispatch(createCarTypeAsync(values))
    }
    if(isSuccessApi(res.payload?.status)){
      dispatch(setMessageText(values?.id ? t('edit_user_success') : t('add_user_success')))
      dispatch(setSeverity('success'))
      onSearch(keyword)
      handleClearUserForm()
    }
  };

  const handleClearUserForm = () => {
    form.resetFields()
    setUserSelected(null)
    setIsModalVisible(false)
  }

  const handleEditUser = (record: UserRecord) => {
    setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record: UserRecord) => {
    setOpenModalDel(true);
  };

  const handelCancelCreateUser = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleDeleteUser = () => {
    // TODO: Gọi API để xóa người dùng
    setOpenModalDel(false);
  };

  const onSearch = (value:any) => {
    dispatch(toggleSetKeyword(value))
    const params = {
      page: pageNumber + 1,
      size: pageSize
    }
    dispatch(getListCarTypeAsync(params))
  };

  return (
    <div className='wrapper_user'>
      <div className='item_user'>
        <div className='header_table_user'>
          <PageTitle title={t('list_car_type')} />
          <div style={{ marginBottom: '10px' }}>
            <CustomButton
              style={{ textAlign: 'center' }}
              type='primary'
              item={t('add_car_type')}
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
              setPageNumber(0)
              setPageSize(10)
              setIsSearch(true)
              onSearch(e)
            }}
          />
        </div>
        <DynamicList
          keyId='id'
          listData={listCarType?.data}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={listCarType?.total_count}
          onPageChange={(pageNumber, pageSize) => {
            setPageNumber(pageNumber)
            setPageSize(pageSize)
          }}
        />
        <div>
          <ModalComponent
            visible={isModalVisible}
            title={userSelected?.id ? t('edit_user') : t('add_user')}
            onOk={() => form.submit()}
            width='48rem'
            onCancel={handelCancelCreateUser}
            okText={t('save')}
          >
            <Form
              id={userSelected?.id || null}
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
                    name='name'
                    label={t('name_car_type')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('name_car_type')}${t('not_empty')}`,
                      },
                      {
                        max: 50,
                        message: `${t('name_car_type')}${t('name_too_long')}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='country'
                    label={t('country')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('country')}${t('not_empty')}`,
                      },
                      {
                        max: 50,
                        message: `${t('country')}${t('name_too_long')}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='description'
                    label={t('description')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('description')}${t('not_empty')}`,
                      },
                      {
                        max: 200,
                        message: `${t('description')}${t('name_too_long')}`,
                      },
                    ]}
                  >
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
            onOk={handleDeleteUser}
            onCancel={() => setOpenModalDel(false)}
            okText={t('confirm')}
          >
             <p className='text-confirm text-lg text-center mb-10'>{`User ${userSelected?.name} ${t(
            'text_confirm_del'
              )}`}</p>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default CarType;
