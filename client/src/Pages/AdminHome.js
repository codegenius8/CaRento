import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar, getAllcars } from "../Redux/actions/carActios";
import { Button, Row, Col, DatePicker,Popconfirm } from "antd";
import "../index.css";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const cars = useSelector((state) => state.carReducer.cars);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllcars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      {loading === true && <Spinner />}
      <Row justify="center" gutter={16} className="mt-5">
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="car-image" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p>{car.rentPerHour} Rent Per Hours /-</p>
                  </div>
                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        style={{ cursor: "pointer" }}
                        className="mr-3"
                      />
                    </Link>
                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={()=>dispatch(deleteCar({ carId: car._id }))}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                       <DeleteOutlined
                    //   onClick={() => }
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    </Popconfirm>
                   
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default AdminHome;
