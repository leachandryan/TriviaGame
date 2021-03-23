// LoginForm.tsx
import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const LoginForm = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setEmailError(!emailRegex.test(values.email));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form
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