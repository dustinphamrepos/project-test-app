import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.scss'
import { postLogin } from '../../services/apiService';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        //validate

        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
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
                <button>Sign up</button>
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