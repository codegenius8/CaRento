import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../Components/DefaultLayout";
import Spinner from "../Components/Spinner";
import { getAllcars } from "../Redux/actions/carActios";
import moment from "moment";
import { bookCar } from "../Redux/actions/bookAction";
import StripeCheckout from "react-stripe-checkout";
// book car
const { RangePicker } = DatePicker;
const BookingCar = () => {
  const [car, setCar] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalHour, setTotalHour] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { cars } = useSelector((state) => state.carReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  console.log("from", from);
  console.log("to", to);
  const dispatch = useDispatch();
  const { carId } = useParams();
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllcars());
    } else {
      setCar(cars.find((obj) => obj._id == carId));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHour * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + totalHour * 30);
    }
  }, [driver, totalHour]);

  const selectTimeSlot = (values) => {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHour(values[1].diff(values[0], "hours"));
  };

  const BookNow = () => {
    
  };

  const onToken = (token) => {
    // console.log(token);
    const BookingDetails = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHour,
      totalAmount ,
      driverRequire: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(BookingDetails));
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="bookingCar bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            {/* <p>{car.rentPerHour}</p> */}
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Person : {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slot
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlot}
          />
          <br />
          <button className="btn1 mt-2 p-2" onClick={() => setShowModal(true)}>
            {" "}
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                {" "}
                Total Hours <b>{totalHour}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h1>Total Amount : {totalAmount}</h1>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="inr"
                amount={totalAmount * 100}
                stripeKey="pk_test_51KgPkmSCzP5m0DnmW4gYeQiARZxmfLVJnThgQvJbtc8WyHPjx0HH5zUMsRQRHJ31p3Dh8B6vAYBe4tqh9EuTcy8K00jfVzhjrN"
              >
                <button className="btn1"> Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked Time Slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button className="btn1" onClick={() => setShowModal(false)}>
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
};

export default BookingCar;
