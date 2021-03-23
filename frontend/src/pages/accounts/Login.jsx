import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Checkbox, notification } from "antd";
import { SmileOutlined, FormOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { useAppContext } from "store";
import { setToken } from "store";
import { parseErrorMessages } from "utils/forms";
import { axiosInstance } from "api";

const Login = () => {
  const { store, dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = async user => {
    const { username, password } = user;

    setFieldErrors({});

    const data = { username, password };
    try {
      const response = await axiosInstance.post("/accounts/token/", data);

      const {
        data: { token: jwtToken },
      } = response;

      dispatch(setToken(jwtToken));

      notification.open({
        message: "로그인 성공",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });

      history.push(loginRedirectUrl);
    } catch (error) {
      if (error.response) {
        notification.open({
          message: "로그인 실패",
          description: "아이디/암호를 확인해주세요.",
          icon: <FormOutlined style={{ color: "#ff3333" }} />,
        });

        const { data: fieldsErrorMessages } = error.response;
        // fieldsErrorMessages => {username :[] , password: []}
        setFieldErrors(parseErrorMessages(fieldsErrorMessages));
      }
    }
  };

  return (
    <Card title="로그인">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete={"false"}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
