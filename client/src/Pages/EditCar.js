import { Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Components/DefaultLayout";
import {
  addCar,
  editCar,
  getAllBookedcars,
  getAllcars,
} from "../Redux/actions/carActios";
import Spinner from "../Components/Spinner";
import { useParams } from "react-router-dom";
const EditCar = () => {
  const { editId } = useParams();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { cars } = useSelector((state) => state.carReducer);
  const [car, setCar] = useState();
  const [totalcar, setTotalCar] = useState([]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // console.log("form values", values);
    values._id = car._id
    dispatch(editCar(values));
  };
   console.log(car)
  useEffect(() => {
    dispatch(getAllcars());
    if (cars.length == 0) {
      dispatch(getAllcars());
    } else {
       setTotalCar(cars)
      setCar(cars.find((o) => o._id == editId));
    }
  }, []);

  return (
    <DefaultLayout>
      {loading === true && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24}>
          { totalcar.length > 0 && (<Form  initialValues={car} className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>
              <b>EDIT CAR</b>
            </h3>
            <Form.Item
              name="name"
              label="Car Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Car Image"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentPerHour"
              label="Rent Per Hours"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="fuelType"
              label="Fuel Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <div className="text-right">
              <button className="btn1 mb-3">EDIT CAR</button>
            </div>
          </Form>)}
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default EditCar;
