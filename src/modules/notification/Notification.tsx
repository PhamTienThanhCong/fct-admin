import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import ModalReply, { DataType as ReplyDataType } from "../../components/common/ModalReply";
import { timezoneDate } from "../../Utils/timezoneDate";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  content: string;
  time: Date;
  reply: string[]; 
}

const Notification: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  useEffect(() => {
    // Mock data for notifications
    const fakeData: DataType[] = [
      {
        key: "1",
        name: "User 1",
        time: new Date("2002-04-20 10:20"),
        content: "Notification content 1",
        reply: [], 
      },
      {
        key: "2",
        name: "User 2",
        time: new Date("2002-04-20 10:20"),
        content: "Notification content 1",
        reply: [], 
      },
      {
        key: "3",
        name: "User 3",
        time: new Date("2002-04-20 10:20"),
        content: "Notification content 1",
        reply: [], 
      },

    ];
    setDataSource(fakeData);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "25%",
    },
    {
      title: "Content",
      dataIndex: "content",
      width: "50%",
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "15%",
      render: (time: Date) => (
        <span>{time ? timezoneDate(moment(time)) : ""}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "25%",
      render: (_, record) => (
        <span className="action-btn-user">
          <Button
            onClick={() => handleReplyModal(record)} 
            style={{ marginRight: "10px" }}
            type="primary"
          >
            Reply
          </Button>
          <Button type="default" >Xóa</Button>
        </span>
      ),
    },
  ];

  const handleReplyModal = (record: DataType) => { 
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  return (
    <div className="content-userList">
      <div className="title-table-user">
        <h2>Notifications</h2>
      </div>
      <div className="main-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: dataSource.length,
            showSizeChanger: true,
          }}
          onChange={(pagination) => {
            setPageNumber(pagination.current || 1);
            setPageSize(pagination.pageSize || 10);
          }}
        />
      </div>
      {selectedRecord && (
        <ModalReply
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          mode="Reply"
          userData={selectedRecord}
        />
      )}
      
    </div>
  );
};

export default Notification;
