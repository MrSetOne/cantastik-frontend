import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const login = async(user) => {
    const res = await axios.put(API_URL + '/users/login', user)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data.loggedUser))
        localStorage.setItem('token', JSON.stringify(res.data.token))
    }
    return res.data
}

const newInfo = async() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/users/session`, {
        headers: {
            authorization: token ? token : null
        },
    })
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data.sessionUser))
    }
    return res.data.sessionUser
}

const signup = async(user) => {
    const res = await axios.post(API_URL + '/users', user)
    return res.data
}

const logout = async() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(API_URL + "/users/logout", {}, {
        headers: {
            authorization: token ? token : null
        },
    });
    if (res.data) {
        localStorage.removeItem("user");
        localStorage.removeItem("token")
    }
    return res.data;
};

const updateUser = async(data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/users/modify`, data, {
        headers: {
            authorization: token ? token : null
        },
    });
    return (res.data)
}

const doAFollow = async(target) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/users/follow/${target}`, {}, {
        headers: {
            authorization: token ? token : null
        },
    });
    return (res.data)
}

const doAnUnfollow = async(target) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/users/unfollow/${target}`, {}, {
        headers: {
            authorization: token ? token : null
        },
    });
    return (res.data)
}

const verify = async(token) => {
    const res = await axios.get(`${API_URL}/users/confirm/${token}`)
    return res.data
}

const wellcomeEnd = async() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/users/firsttime`, {}, {
        headers: {
            authorization: token ? token : null
        },
    });
    return res.data
}

const authService = {
    login,
    newInfo,
    signup,
    logout,
    updateUser,
    doAFollow,
    doAnUnfollow,
    verify,
    wellcomeEnd
}

export default authService