import { useState } from "react";
import Select from "react-select";
import { BsPlusSquareFill } from "react-icons/bs";
import { FaMinusSquare } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import './Questions.scss'

const options =
    [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

const Questions = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState(
        [
            {
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
            },
        ]
    )

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
    // console.log(questions);
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
                        options={options}
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
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                        />
                                        <label>Question {index + 1}'s description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input type="file" hidden />
                                        <span>0 file is uploaded</span>
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
                                                    />
                                                    <div className="form-floating answer-name">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="name@example.com"
                                                            value={answer.description}
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
            </div>
        </div>
    );
}

export default Questions;