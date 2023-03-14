import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, userName, role, image) => {
    //call apis
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}


const putUpdateUser = (id, userName, role, image) => {
    //call apis
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

export { postCreateUser, getAllUsers, putUpdateUser }