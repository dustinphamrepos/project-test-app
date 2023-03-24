import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaReact } from "react-icons/fa";
import { logOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Languages from './Languages';

const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    // console.log(account)

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('login')
    }

    const handleSignUp = () => {
        navigate('register')
    }

    const handleLogOut = async () => {
        const res = await logOut(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            // clear data redux
            dispatch(doLogOut())
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
        console.log('>>>:', res)
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Hoi dan IT</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>
                    <FaReact className="brand-icon" />
                    Hoi Trung Duc
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="users" className='nav-link'>Users</NavLink>
                        <NavLink to="admins" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false
                            ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                <button className='btn-signup' onClick={() => handleSignUp()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Setting" id="basic-nav-dropdown2">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Languages />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;