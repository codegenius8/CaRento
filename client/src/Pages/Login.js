import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./Login.css";
import "../index.css";
import { loginUser } from "../Redux/actions/userAction";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();

  const login = (values) => {
    console.log(values);
    dispatch(loginUser(values));
  };

  return (
    <div className="login">
      <Row gutter={16}>
        <Col lg={6}></Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={login}>
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1 mt-2  mb-3">Login</button>
            <br />
            <Link to="/register">Yet not registered ? please register </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
