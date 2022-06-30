import axios from 'axios'

const API_URL = "http://localhost:8080"


const login = async(user) => {
    const res = await axios.put(API_URL + '/users/login', user)
    if (res.data) {
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data.loggedUser))
        localStorage.setItem('token', JSON.stringify(res.data.token))
    }
    console.log(res.data)
    return res.data
}




const logout = async() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.delete(API_URL + "/users/logout", {
        headers: {
            authorization: user ? user.token : null
        },
    });
    if (res.data) {
        localStorage.removeItem("user");
    }
    return res.data;
};

// const register = async (user)=>{
//     const res = await axios.post(API_URL +'/users',user)
//     return res.data
// }

const authService = {
    // register,
    login,
    // logout
}

export default authService