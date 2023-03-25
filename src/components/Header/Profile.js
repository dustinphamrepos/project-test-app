import Modal from 'react-bootstrap/Modal';
import { Tab, Tabs } from 'react-bootstrap';
import UserInfo from './UserInfo';
import Password from './Password';
import History from './History';
import './Profile.scss'

const Profile = (props) => {
  const { show, setShow } = props

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>User's Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="User information">
              <UserInfo
                show={show}
                setShow={setShow}
              />
            </Tab>
            <Tab eventKey="password" title="Change">
              <Password />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;