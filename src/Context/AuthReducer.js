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
                error: action.payload
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
                error: action.payload
            }

        case "FOLLOW_START":
            return {
                user: state.user,
                isFetching: true,
                error: false
            }

        case "FOLLOW_SUCESS":
            return {
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload]
                },
                isFetching: false,
                error: false
            }

        case "FOLLOW_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: action.payload
            }

        case "UNFOLLOW_START":
            return {
                user: state.user,
                isFetching: true,
                error: false
            }

        case "UNFOLLOW_SUCESS":
            return {
                user: {
                    ...state.user,
                    following: state.user.following.filter(f => f !== action.payload)
                },
                isFetching: false,
                error: false
            }

        case "UNFOLLOW_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: action.payload
            }

            case "CHECK_USER_START":
                return {
                    user: state.user,
                    isFetching: true,
                    error: false
                }
    
            case "CHECK_USER_SUCESS":
                return {
                    user: action.payload,
                    isFetching: false,
                    error: false
                }
    
            case "CHECK_USER_FAILURE":
                return {
                    user: state.user,
                    isFetching: false,
                    error: action.payload
                }

        default:
            return state;
    }
};

export default AuthReducer;