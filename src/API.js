import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, followFailure, followStart, followSuccess, unfollowFailure, unfollowStart, unfollowSuccess, checkUserStart, checkUserSuccess, checkUserFailure } from "./Context/AuthActions"

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('/auth/login', user, { withCredentials: true });
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

export const register = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const response = await axios.post('/auth/createUser', user, { withCredentials: true });
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error));
    }
}

export const follow = async (userId, currentUserID, dispatch) => {
    dispatch(followStart());
    try {
        await axios.put(`/users/${userId}/follow`, { withCredentials: true });
        await axios.post(`/conversations/`, { firstID: currentUserID, secondID: userId }, { withCredentials: true });
        dispatch(followSuccess(userId));
    } catch (error) {
        dispatch(followFailure(error));
    }
}

export const unfollow = async (userId, dispatch) => {
    dispatch(unfollowStart());
    try {
        await axios.put(`/users/${userId}/unfollow`, { withCredentials: true });
        dispatch(unfollowSuccess(userId));
    } catch (error) {
        dispatch(unfollowFailure(error));
    }
}

export const getUser = async (dispatch) => {
    dispatch(checkUserStart());
    try {
        const response = await axios.get('users/', { withCredentials: true });
        dispatch(checkUserSuccess(response.data));
    } catch (error) {
        dispatch(checkUserFailure(error));
    }
}