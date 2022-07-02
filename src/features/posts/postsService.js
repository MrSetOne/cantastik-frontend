import axios from 'axios'

const API_URL = "http://localhost:8080"

const getPosts = async() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(API_URL + "/posts/?page=1", {
        headers: {
            authorization: token ? token : null
        },
    });
    return res.data
}

const doALike = async(postId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/posts/like/id/${postId}`, {}, {
        headers: {
            authorization: token ? token : null
        },
    })
    console.log(res.data)
    return res.data
}

const postsService = {
    getPosts,
    doALike
}

export default postsService