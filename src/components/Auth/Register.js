import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Register.scss'
import { postRegister } from '../../services/apiService';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'


const Register = (props) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
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
        let data = await postRegister(email, username, password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
            </div>
            <div className='title col-4 mx-auto'>
                TrungDuc
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who is this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        value={username}
                        type="text"
                        className="form-control"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password (*)</label>
                    <input
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {showPassword
                        ?
                        <span onClick={() => setShowPassword(!showPassword)}>
                            <AiFillEyeInvisible />
                        </span>
                        :
                        <span onClick={() => setShowPassword(!showPassword)}>
                            <AiFillEye />
                        </span>

                    }
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                    >
                        Create my free account
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => navigate('/')}>&#60;&#60; Go to homepage</span>
                </div>
            </div>
        </div>
    );
}

export default Register;