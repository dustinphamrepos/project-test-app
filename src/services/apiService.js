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

const postCreateNewQuestionForQuiz = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postCreateNewAnswerForQuestion = (description, correctAnswer, questionId) => {
    return axios.post('api/v1/answer',
        {
            description: description,
            correct_answer: correctAnswer,
            question_id: questionId
        }
    )
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId })

}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data })

}

const logOut = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token })
}

const getOverview = () => {
    return axios.get(`api/v1/overview`)
}

const postUpdateUserInfo = (username, userImage) => {
    return axios.post(`api/v1/profile`, { username, userImage })
}

const postUpdatePassword = (username, userImage) => {
    return axios.post(`api/v1/profile`, { username, userImage })
}

const getListHistory = () => {
    return axios.get(`api/v1/history`)
}

export {
    postCreateUser, getAllUsers, putUpdateUser,
    deleteUser, getUserWithPaginate, postLogin,
    postRegister, getQuizByUser, getDataQuiz,
    postSubmitAnswersQuiz, postCreateNewQuiz, getAllQuizForAdmin,
    putEditQuiz, deleteQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuizToUser,
    getQuizWithQA, postUpsertQA, logOut, getOverview,
    postUpdateUserInfo, postUpdatePassword, getListHistory
}