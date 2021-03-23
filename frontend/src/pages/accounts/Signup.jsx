import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { SmileOutlined, FormOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { axiosInstance } from "api";

const Signup = () => {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
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
      const response = await axiosInstance.post("/accounts/signup/", data);

      notification.open({
        message: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });

      console.log(history.push("/accounts/login"));
    } catch (error) {
      if (error.response) {
        notification.open({
          message: "회원가입 실패",
          description: "아이디/암호를 확인해주세요.",
          icon: <FormOutlined style={{ color: "#ff3333" }} />,
        });

        const { data: fieldsErrorMessages } = error.response;
        // fieldsErrorMessages => {username :[] , password: []}
        setFieldErrors(
          Object.entries(fieldsErrorMessages).reduce(
            (acc, [fieldName, errors]) => {
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" "),
              };
              return acc;
            },
            {}
          )
        );
      }
    }
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
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
  );
};

export default Signup;
