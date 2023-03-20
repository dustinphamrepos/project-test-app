import { useState } from "react";
import Select from "react-select";
import { BsPlusSquareFill } from "react-icons/bs";
import { FaMinusSquare } from "react-icons/fa";
import './Questions.scss'



const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Questions = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className="questions-container">
            <div className="title">
                aaa
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-1">Select quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className="mt-3">Add questions:</div>
                <div>
                    <div className="questions-content">
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-up">Upload image</label>
                            <input type="file" hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="btn-change-count-questions">
                            <span>
                                <BsPlusSquareFill className="icon-add" />
                            </span>
                            <span>
                                <FaMinusSquare className="icon-remove" />
                            </span>
                        </div>
                    </div>
                    <div className="answers-content">
                        <div className="group-answer">
                            <input
                                className="form-check-input isCorrect"
                                type="checkbox"
                            />
                            <div className="form-floating answer-name">
                                <input type="text" className="form-control" placeholder="name@example.com" />
                                <label>Answer 1</label>
                            </div>
                        </div>

                        <div className="btn-change-count-answers">
                            <span>
                                <BsPlusSquareFill className="icon-add" />
                            </span>
                            <span>
                                <FaMinusSquare className="icon-remove" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;