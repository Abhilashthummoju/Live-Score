import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignInForm = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
        const { email, password } = state;
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        const responseBody = await response.json()
        localStorage.setItem('userData',JSON.stringify(responseBody));
        console.log("abhilash",responseBody)
        if (!response.ok) {
          throw new Error('Login failed');
        }
         window.location.href = '/home';
    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
    } catch (error) {
     console.log(error)   
    }
    
    // navigate('home', {replace: true})
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button style={{width:200,height:40,borderRadius:10,backgroundColor:'#ff4b2b',color:'#ffffff'}}> Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
