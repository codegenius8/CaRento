import React from "react";
import { Row, Col, Form, Input } from "antd";
import "./Login.css";
import "../index.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/actions/userAction";
const Register = () => {
  const dispatch = useDispatch();
  const Register = (values) => {
    console.log(values);
    dispatch(registerUser(values));
  };

  return (
    <div className="login">
      <Row gutter={16}>
        <Col lg={6}></Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={Register}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              // rules={[{ required: true }]}
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
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1 mt-2  mb-3">Register</button>
            <br />
            <Link to="/login">Click here to login </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
