import axios from "axios";

const API_URL = "http://localhost:8080"

const getById = async(id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/users/id/${id}`, {
        headers: {
            authorization: token ? token : null
        },
    });
    console.log(res.data)
    return res.data
}




const usersService = {
    getById
}

export default usersService