import { Form } from "antd"
import PageTitle from "../../layouts/components/Pagetitle"
import { useTranslation } from "react-i18next"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
interface RoleRecord {
  key: React.Key,
  role : string,
  code : string,
  name : string,
}

const Role: React.FC = () => {
  const { t } = useTranslation('translation')
  const [form] = Form.useForm()

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
      width: 200,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 200,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Action',
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

	return(
		<div>
	    <PageTitle title="Vai Trò"/>
	  </div>
	)
}
export default Role