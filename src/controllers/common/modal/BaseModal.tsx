import { Modal } from 'antd'
import React, { ReactNode, useLayoutEffect } from 'react'
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
  hidenIconSubmit?: boolean
}

const ModalComponent: React.FC<ModalProps> = ({ visible, title, children, icon, width, onOk, onCancel, okText,hidenIconSubmit = false }) => {
  const theme = localStorage.getItem('themeLayout') === 'dark'

  const handleCancel = () => {
    document.documentElement.classList.remove('lock-body-scroll')
    onCancel()
  }

  const handleOk = () => {
    onOk()
  }

  useLayoutEffect(() => {
    if (visible) {
      document.documentElement.classList.add('lock-body-scroll')
    } else {
      document.documentElement.classList.remove('lock-body-scroll')
    }
  }, [visible])

  return (
    <Modal
      title={
        <div style={{display:'flex',alignItems:'center'}}>
          {icon}
          <div>{title}</div>
        </div>
      }
      open={visible}
      centered
      className={theme ? 'dark-modal' : ''}
      destroyOnClose
      closable={false}
      footer={[
        <div className='action_button' key='button'>
          <CustomButton
            key='cancel'
            className='button-cancel'
            htmlType='reset'
            size='large'
            item={'hủy'}
            onClick={handleCancel}
          />
          <CustomButton
            size='large'
            type='primary'
            htmlType='submit'
            className='button-submit'
            item={okText}
            icon={hidenIconSubmit ? null : <BsCheckLg fontSize={16} />}
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
