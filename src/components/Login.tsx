import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios";
import { FormEvent, useState } from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../features/userSlice";
import { User, UserState } from "../interface/Users";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
        const response = await axios.post('http://127.0.0.1:8000/api/v0/accounts/login', {
          username: userName,
          password: password,
        })
        dispatch(addUser(newUser))
        console.log(sessionStorage.setItem('token', response.data.access))
        console.log(response.data)
        sessionStorage.setItem('refresh', response.data.refresh)
      } catch (error) {
        console.error('Could not login', error)
      }
      navigate('/dashboard')
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
