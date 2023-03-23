import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Outlet } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import SideBar from "./SideBar"
import './Admin.scss'
import Languages from '../Header/Languages';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className='admin-header'>
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="left-side" />
                    </span>
                    <div className="right-side">
                        <Languages />
                        <NavDropdown title="Setting" id="basic-nav-dropdown2">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className='admin-main'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}

export default Admin