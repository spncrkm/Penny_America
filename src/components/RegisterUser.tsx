import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { googlelogo, group, piglogo, ratings } from "../assets";
import { AppDispatch } from "../store";
import { User } from "../interface/Users";




const RegisterUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<number>(0);
 


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^\S+@\S+\.\S+$/;
  //   return emailRegex.test(email)
  // }

  // const isValidPassword = (password: string) => {
  //   const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  //   const numberRegex = /[0-9]/;
  //   const upperCaseRegex = /[A-Z]/;
  //   const lowerCaseRegex = /[a-z]/;
    
  //   return (
  //     password.length >= 8 &&
  //     symbolRegex.test(password) &&
  //     numberRegex.test(password) &&
  //     upperCaseRegex.test(password) &&
  //     lowerCaseRegex.test(password)
  //   );
  // };



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/v0/accounts/register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: userName,
        password: password,
      })

      setUserId(response.data.id)

      const newUser: User = {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: userName,
        password: password,
      }

      dispatch(addUser(newUser))
      console.log(userId)
      navigate('/login')
      
    } catch (error) {
      console.error('Failed to create user', error);
    }
    
  };

  return (
    <>
      <div className='register-main'>
        <div className='register-left '>
          <div className='reg-left-content'>
            <h2>
              Each penny saved, a future made;
              <br /> In small steps, dreams are carefully laid.
            </h2>
            <p>
              PennyAM has helped over two million people in the U.S. take
              control of their finances
            </p>
            <div>
              <img src={group} alt="avatargroup" />
            </div>
            <div className="five_stars">
              <img src={ratings} alt="star_rating" />
              <p>4.9 reviews across the U.S</p>
            </div>
          </div>
        </div>
        <div className='reg-form'>
          <div className='logo'>
            <img src={piglogo} />
          </div>
          <h2>Sign up to continue</h2>
          <p>Let us help you save so can build your dream</p>
          <div className="btn-container">
            <div className="btn__position">
          <button className="google-signin">
            <img src={googlelogo}/>
          Sign up with Google
          </button>
          </div>
          </div>
          <div className="divider">
           Or 
          </div>
          <div className="form--container">
          <Form >
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={handleEmail}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicUsername'>
              <Form.Control
                type='username'
                placeholder='Username'
                onChange={handleUserName}
                required
              />
            </Form.Group>
            <Row>
            <Form.Group as={Col} className='mb-3' controlId='formBasicFirstName'>
              <Form.Control
                type='firstname'
                placeholder='First name'
                onChange={handleFirstName}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className='mb-3' controlId='formBasicLastName'>
              <Form.Control
                type='lastname'
                placeholder='Last name'
                onChange={handleLastName}
                required
              />
            </Form.Group>
            </Row>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handlePassword}
                required
              />
            </Form.Group>
            <button className="form__button" type='submit' onClick={handleSubmit}>
              Create an account
            </button>
            <p className="login-link">Already have an account? <a href="/">Login</a></p>
          </Form>
          </div>
          <div className='reg__right_footer'>
            <p>&copy; PennyAmerica 2024</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
