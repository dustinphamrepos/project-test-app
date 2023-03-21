import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { Accordion } from 'react-bootstrap'
import './ManageQuiz.scss'
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService'
import TableQuiz from './TableQuiz'
import ModalEditQuiz from './ModalEditQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'


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
    const [showModalEditQuiz, setShowModalEditQuiz] = useState(false)
    const [dataEditQuiz, setDataEditQuiz] = useState({})
    const [listQuizzes, setListQuizzes] = useState([])
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})

    const fetchListQuizzes = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuizzes(res.DT)
        }
    }

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
            fetchListQuizzes()
        } else {
            toast.error(res.EM)
        }
    }

    const handleClickEditQuiz = (quiz) => {
        setShowModalEditQuiz(true)
        // console.log(quiz)
        setDataEditQuiz(quiz)
    }

    const resetDataEditQuiz = () => {
        setDataEditQuiz({})
    }

    const handleClickDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true)
        setDataDeleteQuiz(quiz)
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr />
            <div className="list-detail">
                <TableQuiz
                    listQuizzes={listQuizzes}
                    setListQuizzes={setListQuizzes}
                    fetchListQuizzes={fetchListQuizzes}
                    handleClickEditQuiz={handleClickEditQuiz}
                    handleClickDeleteQuiz={handleClickDeleteQuiz}
                />
            </div>
            <ModalEditQuiz
                show={showModalEditQuiz}
                setShow={setShowModalEditQuiz}
                dataEditQuiz={dataEditQuiz}
                fetchListQuizzes={fetchListQuizzes}
                resetDataEditQuiz={resetDataEditQuiz}
                options={options}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchListQuizzes={fetchListQuizzes}
            />
        </div>
    )
}

export default ManageQuiz;