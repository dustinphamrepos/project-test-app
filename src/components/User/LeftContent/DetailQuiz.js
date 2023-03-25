import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from 'lodash'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getDataQuiz, postSubmitAnswersQuiz } from "../../../services/apiService";
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "../RightContent/RightContent";
import { NavLink } from "react-bootstrap";

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [indexOfCurrentQuestion, setIndexOfCurrentQuestion] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const [isShowAnswer, setIsShowAnswer] = useState(false)
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false)
    // console.log(location)

    // console.log('>>>>>>', params)
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        // console.log("check", res);
        if (res && res.EC === 0) {
            let raw = res.DT
            // console.log('...', raw)
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null
                    let temp = value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false
                        item.answers.isCorrect = false
                        answers.push(item.answers)
                    })
                    // console.log('value: ', value)
                    // console.log('>>>>>key: ', key)
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            // console.log(data)
            setDataQuiz(data)
        }
    }
    // console.log('>>>dataQuiz: ', dataQuiz)
    const handlePrev = () => {
        if (indexOfCurrentQuestion > 0) {
            setIndexOfCurrentQuestion(indexOfCurrentQuestion - 1)
        }
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length - 1 > indexOfCurrentQuestion) {
            setIndexOfCurrentQuestion(indexOfCurrentQuestion + 1)
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz) // react hook doesn't merge state
        // console.log(dataQuizClone)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b
            // console.log(b)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    const handleFinishQuiz = async () => {
        // {
        //     "quizId": 1,
        //         "answers": [
        //             {
        //                 "questionId": 1,
        //                 "userAnswerId": [3]
        //             },
        //             {
        //                 "questionId": 2,
        //                 "userAnswerId": [6]
        //             }
        //         ]
        // }
        // console.log('>>><<<: ', dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = []
                // console.log(question);
                question.answers.forEach(answer => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id)
                    }
                    // console.log(userAnswerId);
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers
            // console.log('...', payload)

            //submit api
            let res = await postSubmitAnswersQuiz(payload)
            console.log('res>>>', res);
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true)
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
                // update
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                alert('something wrong...')
            }
        }
    }

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true)
    }

    return (
        <>
            <Breadcrumb className="quiz-detail-new-header">
                <NavLink to='/' className="breadcrumb-item">
                    Homepage
                </NavLink>
                <NavLink to='/users' className="breadcrumb-item">
                    User
                </NavLink>
                <Breadcrumb.Item active>
                    Do quiz
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-content">
                        <Question
                            isShowAnswer={isShowAnswer}
                            isSubmitQuiz={isSubmitQuiz}
                            index={indexOfCurrentQuestion}
                            handleCheckbox={handleCheckbox}
                            data={
                                dataQuiz && dataQuiz.length > 0
                                    ?
                                    dataQuiz[indexOfCurrentQuestion]
                                    :
                                    []
                            } />
                    </div>
                    <div className="footer">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handlePrev()}
                        >
                            Prev
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                        <button
                            disabled={isSubmitQuiz}
                            className="btn btn-warning"
                            onClick={() => handleFinishQuiz()}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndexOfCurrentQuestion={setIndexOfCurrentQuestion}
                    />
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    handleShowAnswer={handleShowAnswer}
                    dataModalResult={dataModalResult}
                />
            </div>
        </>
    );
}

export default DetailQuiz;