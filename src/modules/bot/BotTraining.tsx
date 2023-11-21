import React from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../layouts/components/Pagetitle";
import { showAlert } from "../../utils/showAlert";
import { useAppDispatch } from "../../config/hooks";
import { Button, Card, Col, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { crawBotData, getBotData, trainBotData } from "./api";
import { setLoadingStatus } from "../global/slices";

const BotTraining: React.FC = () => {
    const dispatch = useAppDispatch();

    const [codeData, setCodeData] = React.useState<any>("");
    const [webData, setWebData] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onCrawData = async () => {
        if(webData.length === 0) return showAlert("error", "Please input website");
        setIsLoading(true);
        await dispatch(crawBotData({ website: webData }));
        showAlert("success", "Craw data success");
        setIsLoading(false);
    };

    const onGetCodeData = async () => {
        setIsLoading(true);
        let res = await dispatch(getBotData({}));
        setCodeData(JSON.stringify(res.payload));
        showAlert("success", "Get code data success");
        setIsLoading(false);
    };

    const onTraining = async () => {
        setIsLoading(true);
        await dispatch(trainBotData({}));
        setIsLoading(false);
    };

    return (
        <div className="wrapper_user">
            <div className="item_user">
                <div className="header_table_user">
                    <PageTitle title="Huấn luyện chatbot" />
                </div>
                {/* two button test data and training */}
                <div style={{ padding: "16px" }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Huấn luyện">
                                <p>Huấn luyện chatbot với dữ liệu hiện tại</p>
                                {/* flex div*/}
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                    <Button type="primary" disabled={isLoading} onClick={()=>onTraining()} >Huấn luyện</Button>
                                    <Button type="primary" disabled={isLoading} onClick={() => onGetCodeData()}>
                                        Xem Dữ liệu hệ thống
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Dữ liệu">
                                <p>Tạo dữ liệu mới cho chatbot</p>
                                <div style={{ display: "flex", marginTop: "10px" }}>
                                    <Button type="primary" disabled={isLoading} onClick={()=>onCrawData()}>Tạo dữ liệu</Button>
                                    {/* input */}
                                    <div style={{ width: "50%", marginLeft: "10px" }}>
                                        <Input placeholder="API data" readOnly={isLoading} value={webData} onChange={(e) => setWebData(e.target.value)} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Col span={24} style={{ marginTop: "16px" }}>
                        <Card title="Tập dữ liệu hệ thống">
                            <p style={{ marginBottom: "10px" }}>Tập dữ liệu của hệ thống</p>
                            <TextArea rows={8} value={codeData} onChange={() => {}} />
                        </Card>
                    </Col>
                </div>
            </div>
        </div>
    );
};

export default BotTraining;
