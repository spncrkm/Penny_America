
import { FormEvent, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/userSlice";
import { setTokens } from "../features/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

// import { useAppDispatch } from "../features/hooks";

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
    <Form>
      <Form.Group>
        <Form.Control type="username" onChange={handleUsername} />
      </Form.Group>
      <Form.Group>
        <Form.Control type="password" onChange={handlePassword} />
      </Form.Group>
    <button className="btn btn-light" onClick={handleSubmit}>
        Log In
    </button>
    </Form>
  )
}

export default Login;
