import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Components/DefaultLayout";
import { getAllBookedcars } from "../Redux/actions/carActios";
import { Row,Col } from "antd";
import moment from "moment";

const Mybookings = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const {bookedCars}  = useSelector(state=>state.carReducer)
    const dispatch = useDispatch()
 useEffect(() => {
    dispatch(getAllBookedcars())
 }, [])
  return (
    <DefaultLayout>
      <h3 className="text-center mt-2">  <b>My bookings</b></h3>
      <Row justify="center" gutter={16}>
          <Col  lg={16} sm={24}>
              {bookedCars.filter(o=>o.user === currentUser._id).length > 0  ?   (bookedCars.filter(o=>o.user === currentUser._id).map(bookings=>{
                  
                    return <Row  justify="center" gutter={16} className="mt-3 bs1 text-left">
                    <Col lg={6} sm={24}>
                        <p><b>{bookings.car.name}</b></p>
                        <p> Total Hours : <b>{bookings.totalHour}</b></p>
                        <p> Rent Per Hours  : <b>{bookings.car.rentPerHour}</b></p>
                        <p> Total Amount :  <b>{bookings.totalAmount}</b></p>
                    </Col>
                    <Col lg={12} sm={24}>
                        <p> Transaction Id : <b>{bookings.transactionId}</b></p>
                        <p> From : <b>{bookings.bookedTimeSlots.from}</b></p>
                        <p> To :  <b>{bookings.bookedTimeSlots.to}</b></p>
                        <p> Date of booking :  <b>{moment(bookings.createdAt).format("MMM,DD,yyy")}</b></p>
                    </Col>
                    <Col lg={6} sm={24}>
                        <img src={bookings.car.image} style={{borderRadius : 5}} height='140' className="p-2" />
                    </Col>
                     
                </Row>
                  
                  
              })) : <h1> No bookings yet</h1>}
          </Col>
      </Row>
    </DefaultLayout>
  );
};

export default Mybookings;
