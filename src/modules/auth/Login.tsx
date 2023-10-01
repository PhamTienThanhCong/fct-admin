import { Button, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import Image from "../../public/images/login-bg.png";
import "./login.scss";
import { showAlert } from "../../utils/showAlert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { DEFAULT_USER_LOGIN } from "../../constants/user";
import { UserLogin } from "../../types/users";
import { loginRequest } from "./api";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();
  const nav = useNavigate();

  const nextUrl = useMemo(
    () =>
      location.state
        ? `${location.state.pathname}${location.state.search}`
        : "/",
    [location.state]
  );

  useEffect(() => {
    if (isAuthenticated) {
      showAlert("success", "Login successfully", 3);
      nav(nextUrl);
    }
  }, [isAuthenticated, nav, nextUrl]);

  const { control, handleSubmit } = useForm({
    defaultValues: DEFAULT_USER_LOGIN,
  });

  const onSubmit = async(data: UserLogin) => {
    const res = await dispatch(loginRequest(data));
    console.log(res);
  };

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
              onFinish={handleSubmit(onSubmit)}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Email"
                      className="custom-input"
                      {...field}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
              >
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
                <Button
                  htmlType="submit"
                  className="custom-button"
                  type="primary"
                >
                  <BiLogIn />
                  <span style={{ paddingLeft: "5px" }}>Login</span>
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
