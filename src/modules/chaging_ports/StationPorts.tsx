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
import StationPortsForm from './StationPortsForm';
import { showAlert } from '../../utils/showAlert';
import { stationPortsPayload } from '../../types/stationPorts/stationPorts';
import { getListPortsTypeAsync } from './slice';

const { Search } = Input;

const StationPorts: React.FC = () => {
  const { listStationPorts, keyword } = useSelector((state: RootState) => state.stationPorts);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isSearch, setIsSearch] = useState(false);
  const [userSelected, setUserSelected] = useState<stationPortsPayload | null>(null);

  
  useEffect(() => {
    if (!isSearch) {
      const params = {
        page: pageNumber + 1,
        size: pageSize,
      };
      dispatch(getListPortsTypeAsync(params));
    }
  }, [dispatch, pageNumber, pageSize, isSearch]);
  
  

  const handleSubmit = async (values: any) => {
    onSearch(keyword)
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: t('Mã trạm'),
      dataIndex: 'id',
      width: 150,
    },
    {
      title: t('station_id'),
      dataIndex: 'station_id',
      width: 150,
    },
    {
      title: t('port_code'),
      dataIndex: 'port_code',
      width: 300,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 150,
    },
    {
      title: t('price'),
      dataIndex: 'price',
      width: 200,
    },
    {
      title: t('power'),
      dataIndex: 'power',
      width: 200,
    },
    {
      title: t('action'),
      className: 'action-column',
      dataIndex: 'action',
      width: 200,
      render: (text: string, record: stationPortsPayload) => (
        <div className="action-buttons-container">
          <EditOutlined onClick={() => handleEditUser(record)} className="icon-action-edit" />
          <DeleteOutlined onClick={() => handleOpenDeleteUser(record)} className="icon-action-delete" />
        </div>
      ),
    },
  ];

  const handleEditUser = (record: stationPortsPayload) => {
    setUserSelected(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOpenDeleteUser = (record: stationPortsPayload) => {
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
  };

  const onSearch = (value: any) => {
  };

return (
    <div className="wrapper_user">
      <div className="item_user">
        <div className="header_table_user">
          <PageTitle title={t('station_ports')} />
          <div style={{ marginBottom: '10px' }}>
            <CustomButton
              style={{ textAlign: 'center' }}
              type="primary"
              item={t('add_station_ports')}
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
          listData={listStationPorts}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={listStationPorts.length}
          onPageChange={(pageNumber, pageSize) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
          }}
        />
        <div>
          <ModalComponent
            visible={isModalVisible}
            title={userSelected ? t('edit_station_ports') : t('add_station_ports')}
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
              <StationPortsForm userId={userSelected ? userSelected.id : null} />
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
            <p className="text-confirm text-lg text-center mb-10">{`${t('text_confirm_del')} ${userSelected?.station_id}  ${t('no')} ?`}</p>
          </ModalComponent>
        </div>
      </div>
    </div>
  );

};

export default StationPorts;
