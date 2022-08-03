import axios from "axios";
import { message } from "antd";
export const loginUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/user/login", reqObj);
    console.log("login info",response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    message.success("Login Successfull");
    setTimeout(() => {
      window.location.href="/"
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("there is an errro in login");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const registerUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/user/register", reqObj);

    message.success("User registered Successfully");
    setTimeout(() => {
      window.location.href="/login"
    }, 500);
    
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("There is an error in registerin user");
    dispatch({ type: "LOADING", payload: false });
  }
};
