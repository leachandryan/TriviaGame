// ForgotPasswordForm.tsx
import React, { useState, useCallback } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const ForgotPasswordForm = () => {
  // State for the email input
  const [email, setEmail] = useState('');
  // State for the email validation error
  const [emailError, setEmailError] = useState(false);
  // State for the form submission status
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handler for the email input change
  const handleEmailChange = useCallback((event) => {
    // Update the email state with the new input
    setEmail(event.target.value);
  }, []);

  // Handler for the email input blur event
  const handleEmailBlur = useCallback(() => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    // Set the email error state based on the email validation
    setEmailError(!emailRegex.test(email));
  }, [email]);

  // Handler for the form submission
  const handleSubmit = useCallback((event) => {
    // Prevent the default form submission
    event.preventDefault();
    // Submit form
    // Here you can add your form submission logic
    // After the form is submitted, set the formSubmitted state to true
    setFormSubmitted(true);
  }, []);

  // If the form has been submitted, render the success message
  if (formSubmitted) {
    return (
      <Typography variant="h6">
        Please check your email for a link to reset your password. If you do not see an email, please check your spam folder before contacting support.
      </Typography>
    );
  }

  // If the form hasn't been submitted yet, render the form
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
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        required
        fullWidth
        error={emailError}
        helperText={emailError ? 'Please enter a valid email address' : ''}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={emailError}>
        Submit
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;