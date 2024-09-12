
import { FormEvent, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
import { setTokens } from "../../features/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

import style from './Login.module.css'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const newUser = {
      username: userName,
      password: password
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/api/v0/accounts/login', {
          username: userName,
          password: password,
        })
        dispatch(setTokens({ access: response.data.access, refresh: response.data.refresh}))
        dispatch(loginUser({ username: userName, password: password }))
        console.log(newUser)
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        navigate('/dashboard')
      }
    }
    

  return (
    <Form className={style.form_container}>
      <Form.Group className={style.input_container}>
        <Form.Control type="username" onChange={handleUsername} placeholder="username" />
      </Form.Group>
      <Form.Group className={style.input_container}>
        <Form.Control type="password" onChange={handlePassword} placeholder="password" />
      </Form.Group>
      <div className={style.btn_container}>
        <button className={style.login} onClick={handleSubmit}>
            Log In
        </button>

      </div>
    </Form>
  )
}

export default Login;
