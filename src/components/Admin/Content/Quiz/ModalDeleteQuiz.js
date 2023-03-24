import { useTranslation } from 'react-i18next'
import React from 'react';
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';

const ModalDeleteUser = (props) => {
    const { t } = useTranslation()

    const { show, setShow, dataDeleteQuiz, fetchListQuizzes } = props;

    const handleClose = () => setShow(false);
    // console.log(dataDeleteQuiz);
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(+dataDeleteQuiz.id)
        console.log(data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await fetchListQuizzes()
        } else {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal-delete-quiz.modal-delete-quiz-1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {t('modal-delete-quiz.modal-delete-quiz-2')}
                    <b>
                        {dataDeleteQuiz && dataDeleteQuiz.id ? ` ${dataDeleteQuiz.id}` : ''}
                    </b>
                    ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('modal-delete-quiz.modal-delete-quiz-3')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        {t('modal-delete-quiz.modal-delete-quiz-4')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser