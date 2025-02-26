import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { paregister } from './service';
import { SetPartner } from './cache';
import { emailWord, passwordWord, signupWord } from './word.js';

const PartnerRegisterForm = ({ setError, refresh, setRefresh }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paypal, setPaypal] = useState('');
  const [telegram, setTelegram] = useState('');
  const [verification, setVerification] = useState('');

  const validateForm = () => {
    if (!email || !password || !verification) {
      setError('Please enter both email and password');
      return false;
    }
    if (!email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    if (!verification.includes('AE7')) {
      setError('Invalid verification');
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must contain at least a uppercase letter, a lowercase letter, a number, and it must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const partner = await paregister(email, password, paypal, telegram);
      SetPartner(partner);
      setRefresh(refresh + 1);
    } catch (error) {
      setError(error.message);
      console.error('register failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <TextField
        label={emailWord()}
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <TextField
        label={passwordWord()}
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <TextField
        label="paypal email"
        type="email"
        fullWidth
        margin="normal"
        value={paypal}
        onChange={(e) => setPaypal(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <TextField
        label="telegram number"
        type="text"
        fullWidth
        margin="normal"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <TextField
        label="verification code"
        type="text"
        fullWidth
        margin="normal"
        value={verification}
        onChange={(e) => setVerification(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: 25,
          color: '#fff',
          width: '94%',
          backgroundColor: '#f35',
          borderRadius: '12px'
        }}
      >
        {signupWord()}
      </Button>
    </form>
  );
};

export default PartnerRegisterForm;
