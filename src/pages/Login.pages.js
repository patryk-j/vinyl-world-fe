import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import isAuthenticated from "auth/auth";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values
      );
      const { token } = response.data;
      navigate("/home");

      localStorage.setItem("token", token);
      window.location.reload();

      console.log("Registration successful:", response.data);
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      form.resetFields();
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <div className="global-centering">
        <h1 className="header-page-text pb-10">Login panel</h1>
        <div className="w-96">
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex flex-row justify-between items-center">
                <Link to="/register" className="text-white">
                  Register
                </Link>
                <Button
                  size="medium"
                  className="float-right text-white"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
