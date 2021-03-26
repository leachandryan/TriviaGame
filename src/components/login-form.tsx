// LoginForm.tsx
import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const LoginForm = () => {
  // State for the email and password inputs
  const [values, setValues] = useState({ email: '', password: '' });
  // State for the password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  // State for the email validation error
  const [emailError, setEmailError] = useState(false);

  // Handler for the email and password input changes
  const handleChange = (prop) => (event) => {
    // Update the values state with the new input
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handler for the password visibility toggle click
  const handleClickShowPassword = () => {
    // Toggle the showPassword state
    setShowPassword(!showPassword);
  };

  // Handler for the password visibility toggle mouse down event
  const handleMouseDownPassword = (event) => {
    // Prevent the default mouse down event
    event.preventDefault();
  };

  // Handler for the email input blur event
  const handleEmailBlur = () => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    // Set the email error state based on the email validation
    setEmailError(!emailRegex.test(values.email));
  };

  // Handler for the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission
    event.preventDefault();

    const apiUrl = 'http://127.0.0.1:8787/api/auth/login'; // Replace with your API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        // Handle error
        console.error('Failed to login:', response.statusText);
        alert('Login Failed');
        return;
      }

      // Assuming the API returns a JSON response
      const responseData = await response.json();
      console.log('Login successful:', responseData);
      alert('Login Successful');

      const { token, expires_at } = responseData.result.session;

      // Set the session information in local storage
      const sessionData = {
        token: token,
        email: values.email,
        expires_at: expires_at
      };

      localStorage.setItem('session', JSON.stringify(sessionData));
      // You can also perform additional actions after successful login
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    // Form component
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2, // for margin between items
      }}
    >
      <TextField
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleEmailBlur}
        required
        fullWidth
        error={emailError}
        helperText={emailError ? 'Please enter a valid email address' : ''}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={emailError}>
        Login
      </Button>
      <Link href="/forgot-password" passHref>
        <Button color="secondary">Forgot password?</Button>
      </Link>
    </Box>
  );
};

export default LoginForm;