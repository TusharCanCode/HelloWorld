import AuthReducer from "./AuthReducer";
import { createContext, useReducer } from "react";
import axios from "axios";

const getUser = async () => {
    try {
        const response = await axios.get('users/', { withCredentials: true });
        if (response.status !== 200)
            return null;
        return response.data;
    } catch (error) {
        return null;
    }
}

const INITIAL_STATE = {
    // user: getUser().then(function (result) {
    //     return result;
    // }),
    user: null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
}