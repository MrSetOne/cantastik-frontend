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
    console.log(res.data)
    return res.data
}

// const logout = async() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const res = await axios.delete(API_URL + "/users/logout", {
//         headers: {
//             authorization: user ? user.token : null
//         },
//     });
//     if (res.data) {
//         localStorage.removeItem("user");
//     }
//     return res.data;
// };


const authService = {
    login,
    signup
    // logout
}

export default authService