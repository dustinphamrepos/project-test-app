import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);
    // console.log(dataModalResult);
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total questions: <b>
                            {dataModalResult.countTotal}
                        </b>
                    </div>
                    <div>
                        Total correct answers: <b>
                            {dataModalResult.countCorrect}
                        </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult