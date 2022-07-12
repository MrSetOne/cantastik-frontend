import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const getById = async(id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/users/id/${id}`, {
        headers: {
            authorization: token ? token : null
        },
    });
    return res.data
}




const usersService = {
    getById
}

export default usersService