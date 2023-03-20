import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FcPlus } from 'react-icons/fc'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { putUpdateUser } from '../../../../services/apiService';


const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdateUser } = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const handleClose = () => {
        setShow(false)
        setEmail('')
        setPassword('')
        setUserName('')
        setRole('USER')
        setImage('')
        setPreviewImage('')
        props.resetUpdateData()
    };


    useEffect(() => {
        if (!_.isEmpty(dataUpdateUser)) {
            setEmail(dataUpdateUser.email)
            setUserName(dataUpdateUser.username)
            setRole(dataUpdateUser.role)
            setImage('')
            if (dataUpdateUser.image) {
                setPreviewImage(`data:image/png;base64,${dataUpdateUser.image}`)
            }
        }
    }, [dataUpdateUser])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            // setPreviewImage(null)
        }
    }

    const handleSubmitCreateUser = async () => {
        //validate

        let data = await putUpdateUser(dataUpdateUser.id, userName, role, image)
        console.log('>>>check: ', data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers()
            // props.setCurrentPage(1)
            await props.fetchListUsersWithPaginate(props.currentPage)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

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
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            onChange={e => setRole(e.target.value)}
                            value={role}
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
                            onChange={e => handleUploadImage(e)}
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser

