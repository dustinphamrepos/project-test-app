import { useState } from 'react';
import './Login.scss'


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        alert('scdvcewvc')
    }

    return (
        <div className="login-container">
            <div className='header'>
                Do you have an account yet?
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
            </div>
        </div>
    );
}

export default Login;