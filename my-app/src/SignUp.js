import React, { useState } from "react";

const SignUpForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { name, email, password } = state;

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Sign up failed');
      }

      alert('Sign up successful');
      // Reset form fields
      setState({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error('Error:', error.message);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button style={{width:200,height:40,borderRadius:10,backgroundColor:'#ff4b2b',color:'#ffffff'}} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
