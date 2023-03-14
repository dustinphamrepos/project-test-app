import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FcPlus } from 'react-icons/fc'
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'


const ModalViewUser = (props) => {
    const { show, setShow, dataView, resetViewData } = props
    const handleClose = () => {
        setShow(false)
        setEmail('')
        // setPassword('')
        setUserName('')
        setRole('USER')
        setImage('')
        setPreviewImage('')
        resetViewData()
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email)
            // setPassword(dataView.password)
            setUserName(dataView.username)
            setRole(dataView.role)
            setImage(dataView.image)
            if (dataView.image) {
                setPreviewImage(`data:image/png;base64,${dataView.image}`)
            }
        }
    }, [dataView])

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body><form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            disabled
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            disabled
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">UserName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userName}
                            disabled
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            onChange={e => setRole(e.target.value)}
                            value={role}
                            disabled
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className='col-md-12'>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />
                            Upload file Image
                        </label>
                        <input
                            type='file'
                            hidden
                            id="labelUpload"
                        />
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage
                            ?
                            <img src={previewImage} />
                            :
                            <span>Preview image</span>
                        }

                    </div>
                </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser

