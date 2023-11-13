import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import '../account/MyAccount.scss';
import { Col, Divider, Menu, Row } from 'antd';
import ChangeAvata from './ChangeAvata';
import Profile from '../account/Profile';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { updateUser } from '../users/api';

const MyAccount = () => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch<any>()
  const [selectedMenuItem, setSelectedMenuItem] = useState('1')
  const [titleTabActive, setTitleTabActive] = useState<string>()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: t('profile_picture'),
      onClick: () => {
        setSelectedMenuItem('1')
      }
    },
    {
      key: '2',
      label: t('profile_info'),
      onClick: () => {
        setSelectedMenuItem('2')
      }
    },
    {
      key: '3',
      label: t('change_password'),
      onClick: () => {
        setSelectedMenuItem('3')
      }
    }
  ]
  useEffect(()=>{
    if(selectedMenuItem === '1'){
      setTitleTabActive(t('profile_picture'))
    }else if(selectedMenuItem === '2'){
      setTitleTabActive(t('profile_info'))
    }else {
      setTitleTabActive(t('change_password'))
    }
  },[selectedMenuItem,t])

  const onFinishPersonalInfo = async (values: any) => {
    delete values?.role
    delete values?.userName
    await dispatch(updateUser(values))
  }


  return(
    <div className='main-container'>
      <div className='view-container'>
        <Row className='w-full'>
          <Col xs={24} sm={6}>
            <Menu items={items} selectedKeys={[selectedMenuItem]}/>
          </Col>
          <Col xs={24} sm={18}>
            <div className='title-avata'>{titleTabActive}</div>
            <Divider />
            {selectedMenuItem === '1' && <ChangeAvata/>}
            {selectedMenuItem === '2' && <Profile onFinishPersonalInfo={onFinishPersonalInfo}/>}
            {selectedMenuItem === '3' && <ChangePassword/>}
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default MyAccount