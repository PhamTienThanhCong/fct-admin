import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Upload, Image, Modal, message } from "antd";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from 'antd/lib/upload/interface';
import { RcFile } from "antd/es/upload";

interface ListStationFormProps {
  userId: number | null;
  initialImageUrl: string | null;
}

const ListStationForm: React.FC<ListStationFormProps> = ({ userId, initialImageUrl }) => {
  const { t } = useTranslation("translation");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList.slice(-1));
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isImage && isLt2M;
  };

  const handlePreview = async (file: UploadFile | undefined) => {
    if (file) {
      if (!file.url && !file.preview) {
        if (file.originFileObj) {
          file.preview = await getBase64(file.originFileObj);
        }
      }
      setPreviewImage(file?.url || file.preview || '');
      setPreviewVisible(true);
      setPreviewTitle(
        file?.name || (file?.url && file.url.substring(file.url.lastIndexOf('/') + 1)) || ''
      );
    }
  };

  const customRequest = async ({ file, onSuccess }: any) => {
    try {
      const base64Url = await getBase64(file);
      setImageUrl(base64Url);
      setLoading(false);
      onSuccess();
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      message.error("Failed to upload image. Please try again.");
    }
  };


	return (
		<Row gutter={24}>
	  <Col span={12}>
		<Form.Item
		  name="id"
		  label={t("id")}
		  rules={[
			{
			  required: true,
			  whitespace: true,
			  message: `${t("id")}${t("not_empty")}`,
			},
		   
		  ]}>
		  <Input  />
		</Form.Item>
	  </Col>
			<Col span={12}>
				<Form.Item
					name="name"
					label={t("name_car_type")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("name_car_type")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("name_car_type")}${t("name_too_long")}`,
						},
					]}>
					<Input disabled={!!userId} />
				</Form.Item>
			</Col>

			<Col span={12}>
				<Form.Item
					name="description"
					label={t("description")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("description")}${t("not_empty")}`,
						},
						{
							max: 200,
							message: `${t("description")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>
	  <Col span={12}>
				<Form.Item
					name="address"
					label={t("address")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("address")}${t("not_empty")}`,
						},
						{
							max: 100,
							message: `${t("address")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>
      <Col span={12}>
        <Form.Item
          name="image"
          label={t("image")}
          rules={[
            {
              validator: (_, value) => {
                if (fileList.length === 0 && !imageUrl) {
                  return Promise.reject(`${t("image")}${t("not_empty")}`);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            accept=".jpg, .jpeg, .png"
            onPreview={handlePreview}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="Image" style={{ width: "100%" }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Col>
	  <Col span={12}>
		<Form.Item
		  name="email"
		  label={t("email")}
		  rules={[
			{
			  required: true,
			  whitespace: true,
			  message: `${t("email")}${t("not_empty")}`,
			},
			{
			  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			  message: `${t("email")} ${t("invalid_format")}`,
			},
		  ]}
		>
		  <Input />
		</Form.Item>
	  </Col>
	  <Col span={12}>
		<Form.Item
		  name="phone"
		  label={t("phone_number")}
		  rules={[
			{
			  required: true,
			  message: `${t("phone_number")} ${t("not_empty")}`,
			},
			{
			  pattern: /^[0-9]+$/,
			  message: `${t("phone_number")} ${t("must_be_number")}`,
			},
		  ]}>
		  <Input />
		</Form.Item>
	  </Col>

			<Col span={12}>
				<Form.Item
					name="open_time"
					label={t("open_time")}
					rules={[
						{
							required: true,
							message: `${t("open_time")}${t("not_empty")}`,
						},
					]}>
			<Input/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="close_time"
					label={t("close_time")}
					rules={[
						{
							required: true,
							message: `${t("close_time")}${t("not_empty")}`,
						},
					]}>
			<Input/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="is_order"
					label={t("is_order")}
					rules={[
						{
							required: true,
							message: `${t("is_order")}${t("not_empty")}`,
						},
					]}>
					<Input/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="owner_id"
					label={t("owner_id")}
					rules={[
						{
							required: true,
							whitespace: true,
							message: `${t("owner_id")}${t("not_empty")}`,
						},
						{
							max: 50,
							message: `${t("owner_id")}${t("name_too_long")}`,
						},
					]}>
					<Input />
				</Form.Item>
			</Col>
	  <Col span={12}>
		<Form.Item
		  name="local_x"
		  label={t("local_x")}
		  rules={[
			{
			  required: true,
			  message: `${t("local_x")} ${t("not_empty")}`,
			},
			{
			  type: "number",
			  message: `${t("local_x")} ${t("must_be_number")}`,
			  transform: (value) => (value ? Number(value) : undefined),
			},
		  ]}
		>
		  <Input />
		</Form.Item>
	  </Col>
	  <Col span={12}>
		<Form.Item
		  name="local_y"
		  label={t("local_y")}
		  rules={[
			{
			  required: true,
			  message: `${t("local_y")} ${t("not_empty")}`,
			},
			{
			  type: "number",
			  message: `${t("local_y")} ${t("must_be_number")}`,
			  transform: (value) => (value ? Number(value) : undefined),
			},
		  ]}
		>
		<Input />
	  </Form.Item>
	</Col>
		</Row>
	);
};

export default ListStationForm;
