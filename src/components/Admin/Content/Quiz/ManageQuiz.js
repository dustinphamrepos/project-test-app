import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import './ManageQuiz.scss'
import { postCreateNewQuiz } from '../../../../services/apiService'


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]

const ManageQuiz = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setType('')
            setImage(null)
        } else {
            toast.error(res.EM)
        }
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
                            type="text"
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
                            onChange={setType}
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
                    <div>
                        <button
                            className="btn btn-warning mt-3"
                            onClick={() => handleSubmitQuiz()}
                        >
                            Save
                        </button>
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