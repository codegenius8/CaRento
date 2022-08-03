import { message } from "antd";
import axios from "axios";
export const getAllcars = () => async (dispatch) => {
  const token = localStorage.getItem("token")
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/cars/getallcars",{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllBookedcars = () => async (dispatch) => {
  const token = localStorage.getItem("token")
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/cars/getallbookedcars",{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "GET_ALL_BOOKED_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token")
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/cars/addcar", reqObj,{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "LOADING", payload: false });
    message.success("New car added sucessfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("error in adding car");
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token")
  
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.patch("/api/cars/editcar", reqObj,{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "LOADING", payload: false });
    message.success(" car edited successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("error editing car");
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token")
  // console.log("deletId" ,reqObj)
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/cars/deletecar", reqObj,{
      headers: {
      'authorization':`Bearer ${token}`
      }
    });
    dispatch({ type: "LOADING", payload: false });
    message.success(" car deleted successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("error in deleting car");
  }
};
