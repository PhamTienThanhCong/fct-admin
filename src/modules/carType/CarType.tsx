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
import { createCarTypeAsync, deleteCarTypeAsync, getListCarTypeAsync, toggleSetKeyword, updateCarTypeAsync } from './slices';
import CarTypeForm from './CarTypeForm';
import { showAlert } from '../../utils/showAlert';
import { CartypeRecord } from '../../types/carType/carType';

const { Search } = Input;

const CarType: React.FC = () => {
  const { listCarType, keyword } = useSelector((state: RootState) => state.carType);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearch, setIsSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<CartypeRecord | null>(null);

  const handleSubmit = async (values: any) => {
    const params = {
      id: values.id,
      name: values.name,
      country: values.country,
      description: values.description,
    };
    if (userSelected) {
      await dispatch(updateCarTypeAsync({ id: userSelected.id, params }))
      showAlert("success", "create CarType successfully", 3);
    } else {
      showAlert("success", "create CarType successfully", 3);
      await dispatch(createCarTypeAsync(params));   
    }
    onSearch(keyword)
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!isSearch) {
      const params = {
        page: pageNumber + 1,
        size: pageSize,
      };
      dispatch(getListCarTypeAsync(params));
    }
  }, [dispatch, pageNumber, pageSize, isSearch]);

  const columns = [
    {
      title: t('Mã xe'),
      dataIndex: 'id',
      width: 150,
    },
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
      render: (text: string, record: CartypeRecord) => (
        <div className="action-buttons-container">
          <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
          <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
        </div>
      ),
    },
  ];

  const handleEditUser = (record: CartypeRecord) => {
    setUserSelected(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record: CartypeRecord) => {
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
        await dispatch(deleteCarTypeAsync(userSelected.id));
        setOpenModalDel(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSearch = (value: any) => {
    dispatch(toggleSetKeyword(value));
    const params = {
      page: pageNumber + 1,
      size: pageSize,
    };
    dispatch(getListCarTypeAsync(params));
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
              <Form.Item name='id' hidden>
                <Input />
              </Form.Item>
              <CarTypeForm userId={userSelected ? userSelected.id : null} />
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

export default CarType;
