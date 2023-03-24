import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './ManageQuiz.scss'
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService'
import TableQuiz from './TableQuiz'
import ModalEditQuiz from './ModalEditQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import QuizQA from './QuizQA'
import AssignQuiz from './AssignQuiz'


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]

const ManageQuiz = (props) => {
    const { t } = useTranslation()
    
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
                    <Accordion.Header>{t('manage-quiz.manage-quiz-1')}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t('manage-quiz.manage-quiz-2')}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your quiz name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <label>{t('manage-quiz.manage-quiz-3')}</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description'
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                    <label>{t('manage-quiz.manage-quiz-4')}</label>
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
                                    <label className="mb-1">{t('manage-quiz.manage-quiz-5')}</label>
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
                                        {t('manage-quiz.manage-quiz-6')}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                listQuizzes={listQuizzes}
                                setListQuizzes={setListQuizzes}
                                fetchListQuizzes={fetchListQuizzes}
                                handleClickEditQuiz={handleClickEditQuiz}
                                handleClickDeleteQuiz={handleClickDeleteQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('manage-quiz.manage-quiz-7')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t('manage-quiz.manage-quiz-8')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr />
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