export const loginStart = () => ({
    type: "LOGIN_START",
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCESS",
    payload: user,
})

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
})

export const registerStart = () => ({
    type: "REGISTER_START",
})

export const registerSuccess = (user) => ({
    type: "REGISTER_SUCESS",
    payload: user,
})

export const registerFailure = (error) => ({
    type: "REGISTER_FAILURE",
    payload: error,
})

export const followStart = () => ({
    type: "FOLLOW_START",
})

export const followSuccess = (userId) => ({
    type: "FOLLOW_SUCESS",
    payload: userId,
})

export const followFailure = (error) => ({
    type: "FOLLOW_FAILURE",
    payload: error,
})

export const unfollowStart = () => ({
    type: "UNFOLLOW_START",
})

export const unfollowSuccess = (userId) => ({
    type: "UNFOLLOW_SUCESS",
    payload: userId,
})

export const unfollowFailure = (error) => ({
    type: "UNFOLLOW_FAILURE",
    payload: error,
})