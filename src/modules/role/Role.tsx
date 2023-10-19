import { Col, Form, Input, Row } from "antd"
import PageTitle from "../../layouts/components/Pagetitle"
import { useTranslation } from "react-i18next"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import '../role/Role.scss'
import CustomButton from "../../controllers/common/custombutton/CustomButton"
import { IoMdAdd } from "react-icons/io"
import DynamicList from "../../controllers/common/customList/DynamicList"
import { useState } from "react"
import ModalComponent from "../../controllers/common/modal/BaseModal"
import { PiWarningFill } from "react-icons/pi"
import Search from "antd/es/input/Search"
interface RoleRecord {
  key: React.Key,
  role : string,
  code : string,
  name : string,
}

const Role: React.FC = () => {
  const { t } = useTranslation('translation')
  const [form] = Form.useForm()
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [openModalDel, setOpenModalDel] = useState(false)

  const data : RoleRecord[] = [
    {
      key: '1',
      role : "Quản lý",
      code: '123456',
      name: 'vũ thị miên',
    },
    {
      key: '2',
      role : "Nhân viên",
      code: '26653',
      name: 'Trịnh linh chi',
    },
  ]
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 300,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      width: 300,
    },
    {
      title: 'Action',
      className: 'action-column',
      dataIndex:'action',
      render:(text : string , record : RoleRecord) =>(
        <div className="action-buttons-container">
          <EditOutlined 
						className="icon-action-edit"
					/>
          <DeleteOutlined
						className="icon-action-delete" 
					/>
        </div>
      )
    }
  ]

  const handleAddRole = () =>{
    setIsModalVisible(true)
  }
  
  const handelCancelCreateRole = () => {
    form.resetFields()
    setIsModalVisible(false)
  }
  const handleSubmit = ()=>{}
  
  const onSearch = () => {
    console.log('ok')
  }

	return(
		<div className="wapper_role">
	    <div className="content_role">
	      <div className="item_role">
          <PageTitle title="Vai Trò"/>
          <CustomButton
            type="primary"
            item={t('add_role')}
            icon={<IoMdAdd fontSize={16} />}
            onClick={handleAddRole}
          />
        </div>
        <div className='form-search'>
          <Search
            placeholder={t('search')}
            allowClear
            enterButton
            size='large'
            onSearch={(e) => {
              // setIsSearch(true)
              setPageNumber(0)
              setPageSize(10)
              onSearch()
            }}
          />
        </div>
        <DynamicList
          keyId="key"
          listData={data}
          listColumn={columns}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={data.length}
          onPageChange={(pageNumber, pageSize)=>{
            setPageNumber(pageNumber);
            setPageSize(pageSize);
          }}
        />
        <div>
          <ModalComponent
            title={t('add_role')}
            visible={isModalVisible}
            onOk={()=>form.submit()}
            onCancel={handelCancelCreateRole}
            okText={t('save')}
          >
            <Form
              form={form}
              name="validateOnly"
              onFinish={handleSubmit}
              layout='vertical'
              autoComplete='off'
              className='form-add-role'
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label={t('name')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('rule_user')}${t('not_empty')}`
                      },
                      {
                        max: 50,
                        message: `${t('rule_user')}${t('name_too_long')}`
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label={t('role')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('role')}${t('not_empty')}`
                      },
                      {
                        max: 50,
                        message: `${t('role')}${t('name_too_long')}`
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="code"
                    label={t('code')}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `${t('code')}${t('not_empty')}`
                      },
                      {
                        max: 50,
                        message: `${t('code')}${t('name_too_long')}`
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ModalComponent>
        </div>
	    </div>
	  </div>
	)
}
export default Role