const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }

        case "LOGIN_SUCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }

        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.error
            }

        case "REGISTER_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }

        case "REGISTER_SUCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }

        case "REGISTER_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.error
            }

        default:
            return state;
    }
};

export default AuthReducer;