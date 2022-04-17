import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./Context/AuthActions"

export const login = async (user, dispatch)=>{
    dispatch(loginStart());
    try {
        const response = await axios.post('auth/login', user, { withCredentials: true });
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

export const register = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const response = await axios.post('auth/createUser', user, {withCredentials: true});
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error));
    }
}