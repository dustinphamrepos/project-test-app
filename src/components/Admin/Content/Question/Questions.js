import { useEffect, useState } from "react";
import Select from "react-select";
import { BsPlusSquareFill } from "react-icons/bs";
import { FaMinusSquare } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import './Questions.scss'
import {
    getAllQuizForAdmin,
    postCreateNewAnswerForQuestion,
    postCreateNewQuestionForQuiz
} from "../../../../services/apiService";

const Questions = (props) => {
    const [isValidAnswerColor, setIsValidAnswerColor] = useState(false)
    const [isValidQuestionColor, setIsValidQuestionColor] = useState(false)
    const initQuestions = [{
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        isValidQuestionColor: false,
        answers: [
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
                isValidAnswerColor: false
            },
        ]
    }]
    const [questions, setQuestions] = useState(initQuestions)

    const [isShowPreviewImage, setIsShowPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuizzes, setListQuizzes] = useState([])

    useEffect(() => {
        fetchListQuizzes()
    }, [])

    const fetchListQuizzes = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newListQuizzes = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuizzes(newListQuizzes)
        }
    }
    // console.log(listQuizzes)

    const handleChangeAmountQuestions = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(questionClone => questionClone.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleChangeAmountAnswers = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(questionClone => questionClone.id === questionId)
        if (index > -1) {
            if (type === 'ADD') {
                const newAnswer =
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
                questionsClone[index].answers.push(newAnswer)
                setQuestions(questionsClone)
            }

            if (type === 'REMOVE') {
                questionsClone[index].answers = questionsClone[index].answers.filter(answer => answer.id !== answerId)
                setQuestions(questionsClone)
            }
        }
    }

    const handleOnChangeQuestion = (type, questionId, value) => {
        setIsValidQuestionColor(false)
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(questionClone => questionClone.id === questionId)
        if (index > -1 && type === 'QUESTION') {
            questionsClone[index].description = value
            setQuestions(questionsClone)
        }
    }

    const handleOnChangeImageFileQuestion = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(questionClone => questionClone.id === questionId)
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionsClone[index].imageFile = e.target.files[0]
            // console.log(e.target.files[0])
            questionsClone[index].imageName = e.target.files[0].name
            setQuestions(questionsClone)
        }
    }

    const handleAnswerOfQuestion = (type, questionId, answerId, value) => {
        setIsValidAnswerColor(false)
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(questionClone => questionClone.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value
                    }
                    if (type === 'ANSWER') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(questionsClone)
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(questionClone => questionClone.id === questionId)
        if (index > -1) {
            setIsShowPreviewImage(true)
            setDataImagePreview(
                {
                    title: questionsClone[index].imageName,
                    url: URL.createObjectURL(questionsClone[index].imageFile)
                }
            )
        }

    }
    const handleSubmitQuestionsForQuiz = async () => {

        // todo: validate data
        // 1. validate quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz!')
            return;
        }

        // 2. validate answer
        let isValidAnswer = true
        let indexQuestionOfAnswer = 0, indexAnswer = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexAnswer = j
                    break;
                }
            }
            indexQuestionOfAnswer = i
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            questions[indexQuestionOfAnswer].answers[indexAnswer].isValidAnswerColor = isValidAnswerColor
            // setIsValidAnswerColor(!questions[indexQuestionOfAnswer].answers[indexAnswer].isValidAnswerColor)
            setIsValidAnswerColor(true)
            toast.error(`Not empty description for answer ${indexAnswer + 1} at question ${indexQuestionOfAnswer + 1}`)
            return
        }
        // console.log(isValidAnswer, 'Q: ', indexQuestion, 'A: ', indexAnswer)

        // 3. validate question
        let isValidQuestion = true
        let indexQuestion = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false
                indexQuestion = i
                break;
            }
        }
        if (isValidQuestion === false) {
            questions[indexQuestion].isValidQuestionColor = isValidQuestionColor
            // setIsValidQuestionColor(!questions[indexQuestion].isValidQuestionColor)
            setIsValidQuestionColor(true)
            toast.error(`Not empty description for question ${indexQuestion + 1}`)
            return
        }

        // submit questions with Promise.all (sẽ trả ra danh sách kết quả không giống thứ tự user nhập vào)
        // await Promise.all(questions.map(async (question) => {
        //     let q = await postCreateNewQuestionForQuiz(
        //         +selectedQuiz.value,
        //         question.description,
        //         question.imageFile
        //     )
        //     // submit answers
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnswerForQuestion(
        //             answer.description,
        //             answer.isCorrect,
        //             +q.DT.id
        //         )
        //     }))
        // }))


        // submit questions with for-of loop (trả ra danh sách đúng thứ tự)
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            )
            // submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    +q.DT.id
                )
            }
        }
        toast.success('Create questions and answers succeed!')
        setQuestions(initQuestions)
    }

    return (
        <div className="questions-container">
            <div className="title">
                aaa
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuizzes}
                    />
                </div>
                <div className="mt-3 mb-2">Add questions:</div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="questions-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className={`form-control ${isValidQuestionColor === true ? "is-invalid" : ""}`}
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(e) => handleOnChangeQuestion('QUESTION', question.id, e.target.value)}
                                        />
                                        <label>Question {index + 1}'s description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(e) => handleOnChangeImageFileQuestion(question.id, e)}
                                        />
                                        <span>
                                            {question.imageName
                                                ?
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handlePreviewImage(question.id)}
                                                >
                                                    {question.imageName}
                                                </span>
                                                :
                                                '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className="btn-change-amount-questions">
                                        <span onClick={() => handleChangeAmountQuestions('ADD', '')}>
                                            <BsPlusSquareFill className="icon-add" />
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span onClick={() => handleChangeAmountQuestions('REMOVE', question.id)}>
                                                <FaMinusSquare className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>

                                {
                                    question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <div className="group-answer">
                                                    <input
                                                        className="form-check-input isCorrect"
                                                        type="checkbox"
                                                        checked={answer.isCorrect}
                                                        onChange={e => handleAnswerOfQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                    />
                                                    <div className="form-floating answer-name">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${isValidAnswerColor === true ? "is-invalid" : ""}`}
                                                            placeholder="name@example.com"
                                                            value={answer.description}
                                                            onChange={e => handleAnswerOfQuestion('ANSWER', question.id, answer.id, e.target.value)}
                                                        />
                                                        <label>Answer {index + 1}</label>
                                                    </div>
                                                </div>
                                                <div className="btn-change-amount-answers">
                                                    <span onClick={() => handleChangeAmountAnswers('ADD', question.id)}>
                                                        <BsPlusSquareFill className="icon-add" />
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span onClick={() => handleChangeAmountAnswers('REMOVE', question.id, answer.id)}>
                                                            <FaMinusSquare className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>)
                                    })
                                }

                            </div>
                        )
                    })
                }

                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleSubmitQuestionsForQuiz()}
                        >
                            Save questions
                        </button>
                    </div>
                }


                {isShowPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsShowPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>
        </div>
    );
}

export default Questions;