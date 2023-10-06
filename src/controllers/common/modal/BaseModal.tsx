import { Modal } from 'antd'
import React, { ReactNode } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import CustomButton from '../custombutton/CustomButton'
import '../modal/BaseModal.scss'

interface ModalProps {
  visible: boolean
  title: string
  children: ReactNode
  icon?: ReactNode
  width?: string
  onOk: () => void
  onCancel: () => void
  okText: string
}

const ModalComponent: React.FC<ModalProps> = ({ visible, title, children, icon, width, onOk, onCancel, okText }) => {
  const theme = localStorage.getItem('themeLayout') === 'dark'

  const handleCancel = () => {
    onCancel()
  }

  const handleOk = () => {
    onOk()
  }

  return (
    <Modal
      title={
        <div className={`flex items-center ${icon ? 'flex-col' : ''}`}>
          {icon}
          <div className={`text-3xl ${icon ? 'title-confirm pt-5' : ''}`}>{title}</div>
        </div>
      }
      open={visible}
      centered
      className={theme ? 'dark-modal' : ''}
      destroyOnClose
      closable={false}
      footer={[
        <div className='flex justify-end' key='button'>
          <CustomButton
            key='cancel'
            className='button-cancel'
            htmlType='reset'
            size='large'
            item='Hủy'
            onClick={handleCancel}
          />
          <CustomButton
            size='large'
            type='primary'
            htmlType='submit'
            className='button-submit'
            item={okText}
            icon={<BsCheckLg fontSize={16} />}
            onClick={handleOk}
          />
        </div>
      ]}
      width={width}
    >
      {children}
    </Modal>
  )
}

export default ModalComponent
