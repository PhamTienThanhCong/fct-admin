import { Button, Form, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import { BsTranslate } from "react-icons/bs";
import Image from "../../public/images/login-bg.png";
import "./login.scss";

const { Option } = Select;

const Login = () => {
  const {
      control,
      handleSubmit,
      formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="wrapper-login">
      <img src={Image} alt="Background" className="background-image" />
      <div className="form-login">
          <div className="content-login">
            <div className="title-content">
                <span>Đăng nhập</span>
            </div>
            <div className="mt-5">
              <Form
                name="loginForm"
                initialValues={{
                  remember: true,
                }}
                layout="vertical">
                <Form.Item name="username" label="Username">
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Username"
                        className="custom-input"
                        {...field}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        placeholder="Password"
                        className="custom-input"
                        {...field}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="custom-button" type="primary">
                    <BiLogIn />
                    <span style={{paddingLeft:'5px'}}>Login</span>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
