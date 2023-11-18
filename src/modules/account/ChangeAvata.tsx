import React, { useEffect, useState } from 'react'
import type { RadioChangeEvent, UploadProps } from 'antd'
import { Modal, Radio, Space, Upload } from 'antd'
import type { RcFile } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import imgAvatar from '../../assets/images/avata.png'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../controllers/common/custombutton/CustomButton'
import { BsCheckLg } from 'react-icons/bs'



const ChangeAvata = () => {
  const { t } = useTranslation('translation')
  const [value, setValue] = useState(1)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const handleCancel = () => setPreviewOpen(false)

  const handleChange:UploadProps['onChange'] = ({ fileList: newFileList }) =>{
    if(newFileList?.length > 0){
      const newFile = newFileList[newFileList.length - 1]
      setFileList([newFile])
    }else{
      setFileList(newFileList)
    }
  }
  
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
    
  const handlePreview = async (file: UploadFile | undefined) => {
    if (file) {
      if (!file.url && !file.preview) {
        if (file.originFileObj) {
          file.preview = await getBase64(file.originFileObj);
        }
      }
      setPreviewImage(file?.url || file.preview || '');
      setPreviewOpen(true);
      setPreviewTitle(file?.name || (file?.url && file.url.substring(file.url.lastIndexOf('/') + 1)) || '');
    }
  }
    
	return (
		<div className='wrapper_changeAvata'>
      <p style={{fontSize:'18px'}}>{t('current_avatar')}</p>
      <div className='img-avata'>
        <img
          className='avatar-default'
          src={imgAvatar}
          alt='avatar'
          width={300}
          height={250}
          style={{ objectFit: 'contain',textAlign:'center' }}
        />
      </div>
      <div className='content-changeAvata'>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction='vertical'>
            <Radio value={1}>{t('default_avata')}</Radio>
            <Radio value={2}>{t('upload_file')}</Radio>
          </Space>
        </Radio.Group>
        {value === 2 && (
          <Upload
            listType='picture-card'
            fileList={fileList}
            className='upload-avatar'
            onChange={handleChange}
            onPreview={handlePreview}
          >
            <div>
              <div>{t('select_image')}</div>
            </div>
          </Upload>
        )}
        <Modal
          open={previewOpen} 
          title={previewTitle}
          footer={false}
          onCancel={handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage}/>
        </Modal>
      </div>
      <div style={{marginTop:'15px'}}>
        <CustomButton
          style={{ textAlign: 'center' }}
          type='primary'
          item={<span className='button-save'>{t('save')}</span>}
          size='large'
          icon={<BsCheckLg fontSize={16} />}
          htmlType='button'
          disabled={value === 2 && fileList?.length <= 0}
        />
      </div>
    </div>
	);
}

export default ChangeAvata;