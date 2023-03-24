import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { FcPlus } from 'react-icons/fc'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { putEditQuiz } from '../../../../services/apiService';


const ModalEditQuiz = (props) => {
    const { t } = useTranslation()

    const { show, setShow, dataEditQuiz, resetDataEditQuiz, fetchListQuizzes, options } = props

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [idQuiz, setIdQuiz] = useState('')

    const handleClose = () => {
        setShow(false)
        setName('')
        setDescription('')
        setType('')
        setImage('')
        setIdQuiz('')
        resetDataEditQuiz({})
    };

    useEffect(() => {
        if (!_.isEmpty(dataEditQuiz)) {
            setName(dataEditQuiz.name)
            setDescription(dataEditQuiz.description)
            setIdQuiz(dataEditQuiz.id)
            setImage(dataEditQuiz.image)
            if (dataEditQuiz.image) {
                setPreviewImage(`data:image/png;base64,${dataEditQuiz.image}`)
            }
            let option = options.find(option => option.value == dataEditQuiz.difficulty)
            setType(option)
        }
    }, [dataEditQuiz])
    // console.log(dataEditQuiz)
    const handleSubmitEditQuiz = async () => {
        //validate
        let data = await putEditQuiz(name, description, type?.value, dataEditQuiz.id, image)
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


    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            // setPreviewImage(null)
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
                    <Modal.Title>{t('modal-edit-quiz.modal-edit-quiz-1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body><form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">{t('modal-edit-quiz.modal-edit-quiz-2')}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('modal-edit-quiz.modal-edit-quiz-8')}</label>
                        <Select
                            value={type}
                            onChange={setType}
                            options={options}
                            placeholder={"Quiz style..."}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">{t('modal-edit-quiz.modal-edit-quiz-3')}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='col-md-12'>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />
                            {t('modal-edit-quiz.modal-edit-quiz-4')}
                        </label>
                        <input
                            type='file'
                            hidden
                            id="labelUpload"
                            onChange={e => handleUploadImage(e)}
                        />
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage
                            ?
                            <img src={previewImage} />
                            :
                            <span>{t('modal-edit-quiz.modal-edit-quiz-5')}</span>
                        }

                    </div>
                </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('modal-edit-quiz.modal-edit-quiz-6')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
                    {t('modal-edit-quiz.modal-edit-quiz-7')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditQuiz

