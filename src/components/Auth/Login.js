import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import './Login.scss'
import { postLogin } from '../../services/apiService';
import { doLogin } from '../../redux/action/userAction';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }

        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin())
            toast.success(data.EM)
            navigate('/')
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Do you have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                TrungDuc
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who is this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        value={password}
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    >
                        Login to TrungDuc
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => navigate('/')}>&#60;&#60; Go to homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Login;