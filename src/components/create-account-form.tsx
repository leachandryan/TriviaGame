// CreateAccountForm.tsx
import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateAccountForm = () => {
  // State for the email, password and confirm password inputs
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  // State for the password and confirm password visibility toggle
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  // State for the email and confirm password validation errors
  const [errors, setErrors] = useState({ email: false, confirmPassword: false });

  // Handler for the email, password and confirm password input changes
  const handleChange = (prop) => (event) => {
    // Update the values state with the new input
    setValues({ ...values, [prop]: event.target.value });

    // If the confirmPassword field is being updated, check if it matches the password field
    if (prop === 'confirmPassword') {
      setErrors({ ...errors, confirmPassword: event.target.value !== values.password });
    }
  };

  // Handler for the password and confirm password visibility toggle click
  const handleClickShowPassword = (prop) => () => {
    // Toggle the showPassword state for the clicked input
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  // Handler for the email input blur event
  const handleEmailBlur = () => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    // Set the email error state based on the email validation
    setErrors({ ...errors, email: !emailRegex.test(values.email) });
  };

  // Handler for the confirm password input blur event
  const handleConfirmPasswordBlur = () => {
    // Set the confirm password error state based on the password match
    setErrors({ ...errors, confirmPassword: values.password !== values.confirmPassword });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isLoading) {
      return;
    }
  
    setIsLoading(true);
  
    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      setPasswordMismatch(true);
      setIsLoading(false);
      return;
    }
  
    // Log the payload before sending the request
    console.log("Request Payload:", {
      email: values.email,
      password: values.password,
    });
  
    // Assuming 'http://127.0.0.1:8787/api/auth/register' is the endpoint for the external API
    const apiUrl = 'http://127.0.0.1:8787/api/auth/register';
  
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
        // Handle API error
        if (response.status === 400) {
          alert('The username is already taken');
        } else {
          console.error('Failed to create account:', response.statusText);
        }
        setIsLoading(false);
        return;
      }
  
      // Assuming the API returns a JSON response
      const responseData = await response.json();
      console.log('Account created successfully:', responseData);
      alert('Account Created');
      window.location.href = '/login';
  
    } catch (error) {
      // Handle fetch error
      console.error('Error during account creation:', error.message);
      setIsLoading(false);
    }
  };

  return (
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
        error={errors.email}
        helperText={errors.email ? 'Please enter a valid email address' : ''}
      />
      <TextField
        label="Password"
        type={showPassword.password ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword('password')}>
                {showPassword.password ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={showPassword.confirmPassword ? 'text' : 'password'}
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        onBlur={handleConfirmPasswordBlur}
        required
        fullWidth
        error={errors.confirmPassword}
        helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword('confirmPassword')}>
                {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={errors.email || errors.confirmPassword}>
        Create Account
      </Button>
    </Box>
  );
};

export default CreateAccountForm;