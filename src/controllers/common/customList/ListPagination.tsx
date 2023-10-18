import { Pagination } from 'antd'
import React from 'react'

interface Props {
  pageNumber: number;
  total: number;
  pageSize: number;
  handleChangePage: (page_number: number, size: number) => void;
  onShowSizeChange: (current: number, size: number) => void;
  onPageChange: (page_number: number, size: number) => void; // Thêm onPageChange vào Props
}

const ListPagination: React.FC<Props> = (props) => {
  const startIndex = props.pageNumber * props.pageSize + 1
  const endIndex = startIndex + props.pageSize - 1

  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'20px'
    }}>
      <div style={{ color: '#AFAFAF' }}>{`${endIndex ? startIndex : 0} - ${endIndex} trong ${
        props.total
      } bản ghi`}</div>

      <Pagination
        showSizeChanger={true}
        onShowSizeChange={(page_number, size) => {
          props.onShowSizeChange(page_number - 1, size)
        }}
        onChange={(page_number, size) => {
          props.handleChangePage(page_number - 1, size)
        }}
        current={props.pageNumber + 1}
        total={props.total}
        pageSize={props.pageSize ?? 0}
      />
    </div>
  )
}

export default ListPagination
