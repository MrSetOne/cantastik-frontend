import axios from 'axios'

const API_URL = "http://localhost:8080"

const login = async(user) => {
    const res = await axios.put(API_URL + '/users/login', user)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data.loggedUser))
        localStorage.setItem('token', JSON.stringify(res.data.token))
    }
    return res.data
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


const authService = {
    login,
    signup,
    logout
}

export default authService