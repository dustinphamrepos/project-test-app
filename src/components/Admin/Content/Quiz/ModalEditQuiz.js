import Select from 'react-select'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { putEditQuiz } from '../../../../services/apiService';


const ModalEditQuiz = (props) => {
    const { show, setShow, dataEdit, resetDataEdit, fetchListQuizzes, options } = props

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [idQuiz, setIdQuiz] = useState('')

    const handleClose = () => {
        setShow(false)
        setName('')
        setDescription('')
        setType('')
        setIdQuiz('')
        resetDataEdit({})
    };

    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setName(dataEdit.name)
            setDescription(dataEdit.description)
            setIdQuiz(dataEdit.id)
            let option = options.find(option => option.value == dataEdit.difficulty)
            setType(option)
        }
    }, [dataEdit])
    console.log(dataEdit)
    const handleSubmitEditQuiz = async () => {
        //validate
        let data = await putEditQuiz(name, description, type?.value, dataEdit.id)
        // console.log('>>>check: ', data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await fetchListQuizzes()
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body><form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Type</label>
                        <Select
                            value={type}
                            onChange={setType}
                            options={options}
                            placeholder={"Quiz style..."}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditQuiz

