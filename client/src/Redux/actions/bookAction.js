import { message } from "antd";
import axios from "axios";
export const bookCar = (booking) => async (dispatch) => {
  const token = localStorage.getItem("token")
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/bookcar",booking,{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      message.success("car booked successfully");  
    }, 5000);
    window.location.href="/mybookings"
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("error in booking car");
  }
};
