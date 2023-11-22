import React, { useState } from "react";
import PageTitle from "../../layouts/components/Pagetitle";
import { useAppDispatch } from "../../config/hooks";
import { Button, Card, Col, Input, List, Row, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { chatBotData, crawBotData, getBotData, trainBotData } from "./api";

interface Imessage {
  text: string;
  sender: string;
}

const BotChat: React.FC = () => {
  const dispatch = useAppDispatch();

  const [messages, setMessages] = useState<Imessage[]>([]);
  const [inputValue, setInputValue] = useState<any>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async() => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      text: inputValue,
      sender: "user",
    };

    setMessages((messages) => [...messages, newMessage]);
    setIsLoading(true);
    
    let res = await dispatch(chatBotData({message: inputValue}));
    
    if (res.payload) {
      const botMessage = {
        text: res.payload.message,
        sender: "bot",
      };
    //   delay(1000);
      setTimeout(() => {
        setMessages((messages) => [...messages, botMessage]);
        setIsLoading(false);
      }, 1000);
    }

    setInputValue("");
  };

  return (
    <div className="wrapper_user" style={{ position: "relative" }}>
      <div className="item_user">
        <div className="header_table_user">
          <PageTitle title="Huấn luyện chatbot" />
        </div>
        {/* two button test data and training */}
        <div style={{ padding: "16px" }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                style={{
                  backgroundColor:
                    message.sender === "user" ? "#e6f7ff" : "#f6f6f6",
                  borderRadius: "8px",
                  width: "500px",
                  marginLeft: message.sender === "user" ? "auto" : "0",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                <List.Item.Meta title={message.text} />
              </List.Item>
            )}
            />
            {isLoading && (<Spin size="default" />)}
          <div style={{ marginTop: "16px", display: "flex" }}>
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={inputValue}
              onChange={handleInputChange}
              style={{ flex: "1", marginRight: "8px" }}
            />
            <Button type="primary" onClick={handleSendMessage}>
              Gửi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotChat;
