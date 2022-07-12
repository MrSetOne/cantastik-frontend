import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL


const getPosts = async(page) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/posts/?page=${page}`, {
        headers: {
            authorization: token ? token : null
        },
    });
    return res.data
}

const doALike = async({ postId }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(`${API_URL}/posts/like/id/${postId}`, {}, {
        headers: {
            authorization: token ? token : null
        },
    })
    return res.data
}

const doAnUnlike = async({ postId }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(`${API_URL}/posts/unlike/id/${postId}`, {}, {
        headers: {
            authorization: token ? token : null
        },
    })
    return res.data
}

const addComment = async(info) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(`${API_URL}/comments/id/${info.postId}`, { comment: info.value }, {
        headers: {
            authorization: token ? token : null
        }
    })
    return res.data
}

const getPostsByAuthor = async(id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/posts/author/${id}`, {
        headers: {
            authorization: token ? token : null
        }
    })
    return res.data
}

const createPost = async(data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(`${API_URL}/posts/`, data, {
        headers: {
            authorization: token ? token : null
        }
    })
    return res.data
}

const getPostById = async(id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/posts/id/${id}`, {
        headers: {
            authorization: token ? token : null
        }
    })
    return res.data
}

const findByTitle = async(title) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(`${API_URL}/posts/title/${title}`, {
        headers: {
            authorization: token ? token : null
        }
    })
    return (res.data)
}

const updatePost = async(info) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.put(`${API_URL}/posts/id/${info._id}`, {...info.data }, {
        headers: {
            authorization: token ? token : null
        }
    })
    return (res.data)
}

const deletePost = async(_id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.delete(`${API_URL}/posts/id/${_id}`, {
        headers: {
            authorization: token ? token : null
        }
    })
}

const postsService = {
    getPosts,
    doALike,
    doAnUnlike,
    addComment,
    getPostsByAuthor,
    createPost,
    getPostById,
    findByTitle,
    updatePost,
    deletePost
}

export default postsService