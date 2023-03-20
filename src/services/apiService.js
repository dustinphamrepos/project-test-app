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

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 5000 })
}

const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`)
}

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitAnswersQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`)
}

const putEditQuiz = (name, description, difficulty, id, image) => {
    //call apis
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('id', id);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data)
}


const deleteQuiz = (quizId) => {
    return axios.delete('api/v1/quiz/' + quizId)
}

export {
    postCreateUser, getAllUsers, putUpdateUser,
    deleteUser, getUserWithPaginate, postLogin,
    postRegister, getQuizByUser, getDataQuiz,
    postSubmitAnswersQuiz, postCreateNewQuiz, getAllQuizForAdmin,
    putEditQuiz, deleteQuiz
}