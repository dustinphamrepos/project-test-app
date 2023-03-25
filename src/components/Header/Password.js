import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postUpdatePassword } from '../../services/apiService';

const Password = (props) => {
  const { show, setShow } = props

  const account = useSelector(state => state.user.account)

  const [password, setPassword] = useState("")

  const handleClose = () => {
    setShow(false)
    setPassword('')
  };


  // useEffect(() => {
  //   if (!_.isEmpty(account)) {
  //     setEmail(account.email)
  // }, [account])

  // const handleSubmitCreateUser = async () => {
  //   //validate

  //   let data = await postUpdateProfile(userName, image)
  //   console.log('>>>check: ', data);
  //   if (data && data.EC === 0) {
  //     toast.success(data.EM)
  //     handleClose()
  //   }

  //   if (data && data.EC !== 0) {
  //     toast.error(data.EM)
  //   }
  // }
  return (
    <>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Current password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">New password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}> */}
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Password;