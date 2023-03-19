import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from 'lodash'
import { getDataQuiz } from "../../services/apiService";
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [indexOfCurrentQuestion, setIndexOfCurrentQuestion] = useState(0)

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
                        answers.push(item.answers)
                    })
                    // console.log('value: ', value)
                    // console.log('>>>>>key: ', key)
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

    const handleFinishQuiz = () => {
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
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-content">
                    <Question
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
                        className="btn btn-warning"
                        onClick={() => handleFinishQuiz()}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                Count down
            </div>
        </div>
    );
}

export default DetailQuiz;