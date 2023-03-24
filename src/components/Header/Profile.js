import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tab, Tabs } from 'react-bootstrap';
import UserInfo from './UserInfo';
import Password from './Password';
import History from './History';

const Profile = (props) => {
  const { show, setShow } = props

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="User information">
              <UserInfo />
            </Tab>
            <Tab eventKey="password" title="Change">
              <Password />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;