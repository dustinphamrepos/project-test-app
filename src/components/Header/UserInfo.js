import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import _ from 'lodash'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postUpdateUserInfo } from '../../services/apiService';

const UserInfo = (props) => {

  const { show, setShow } = props

  const account = useSelector(state => state.user.account)

  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState("USER")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  const handleClose = () => {
    setShow(false)
    setEmail('')
    setUserName('')
    setRole('')
    setImage('')
    setPreviewImage('')
  };


  useEffect(() => {
    if (!_.isEmpty(account)) {
      setEmail(account.email)
      setUserName(account.username)
      setRole(account.role)
      setImage('')
      if (account.image) {
        setPreviewImage(`data:image/png;base64,${account.image}`)
      }
    }
  }, [account])

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

    let data = await postUpdateUserInfo(userName, image)
    console.log('>>>check: ', data);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">UserName</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
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
          <div className="col-md-12">
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  )
}

export default UserInfo

