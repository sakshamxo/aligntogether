import { loaduser, errors, signout, loadblogs, loadstories } from "./UserSlice";
import axios from "../axios";

export const asyncsignup = (newuser) => async (dispatch) => {
    try {
        console.log(newuser);
        const { data } = await axios.post("/signup", newuser);
        console.log(data)
        dispatch(loaduser(data.user));
    } catch (err) {
        console.log(err)
        dispatch(errors(err.response.data.message));
    }
};

export const asyncsignin = (newuser) => async (dispatch) => {
    try {
        // console.log(newuser);
        const { data } = await axios.post("/signin", newuser);
        dispatch(loaduser(data.user));
    } catch (err) {
        dispatch(errors(err.response.data.message));
    }
};

export const asyncloaduser = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/loaduser");
        // console.log("loaduser action>>>>>", data);
        // console.log(data);
        dispatch(loaduser(data.user));
    } catch (err) {
        dispatch(errors(err.response.data.message));
    }
};

export const asyncsignout = () => async (dispatch) => {
    try {
        await axios.get("/signout");
        dispatch(signout());
    } catch (err) {
        dispatch(errors(err.response.data.message));
    }
};