import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllcars } from "../Redux/actions/carActios";
import { Button, Row, Col, DatePicker } from "antd";
import "../index.css";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
const Home = () => {
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

  const setFilter = (values) => {
    var selectedFrom = moment(values[0] ,"MMM DD yyyy HH:mm")
    var selectedTo = moment(values[1],"MMM DD yyyy HH:mm")
    var temp = [];
    for (var car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {

          }else{
            temp.push(car)
          }
        }
      }
    }

    setTotalCars(temp)
  };

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm" onChange={setFilter} />
        </Col>
      </Row>

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
                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/bookingcar/${car._id}`}>Book Now</Link>
                    </button>
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

export default Home;
