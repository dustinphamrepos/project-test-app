import React from 'react';
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';

const ModalDeleteUser = (props) => {
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
                    <Modal.Title>Confirm delete the quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete quiz:
                    <b>
                        {dataDeleteQuiz && dataDeleteQuiz.id ? ` ${dataDeleteQuiz.id}` : ''}
                    </b>
                    ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser