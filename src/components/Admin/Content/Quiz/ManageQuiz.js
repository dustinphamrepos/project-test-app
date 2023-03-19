import { useState } from 'react'
import Select from 'react-select'
import './ManageQuiz.scss'


const options = [
    { value: 'EASY', label: 'Chocolate' },
    { value: 'MEDIUM', label: 'Strawberry' },
    { value: 'HARD', label: 'Vanilla' }
]

const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState(null)

    const handleChangeFile = (e) => {

    }
    return (
        <div className="quiz-container">
            <div className="title">
                ManageQuiz
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="your quiz name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            placeholder='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className="my-3">
                        <Select
                            value={type}
                            // onChange={setSelectedOption}
                            options={options}
                            placeholder={"Quiz style..."}
                        />
                    </div>
                    <div className="more-actions form-group">
                        <label className="mb-1">Upload image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={e => handleChangeFile(e)}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz;