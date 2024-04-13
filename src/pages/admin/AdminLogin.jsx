import { useInputValidation } from '6pp';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router';
const AdminLogin = () => {
  const username = useInputValidation('');
  const password = useInputValidation('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isAdmin = true;
  const submitHandler = () => {};

  if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <Container
      component={'main'}
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <>
          <Typography variant="h4">Admin Panel</Typography>
          <form
            style={{
              width: '100%',
              marginTop: '1rem',
            }}
          >
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
              value={username.value}
              onChange={username.changeHandler}
            />
            {username.error && <ErrorMessage field={username} />}
            <TextField
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              variant="outlined"
              value={password.value}
              onChange={password.changeHandler}
            />

            <Button
              sx={{
                position: 'absolute',
                transform: 'translate(-60px, 23px)',
              }}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </Button>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              sx={{ margin: '1rem 0' }}
              onClick={submitHandler}
            >
              Login
            </Button>

            <Typography sx={{ textAlign: 'center', margin: '1rem' }}>
              Or
            </Typography>
            <Button
              type="button"
              variant="text"
              color="secondary"
              fullWidth
              onClick={() => navigate('/login')}
            >
              Back to Chat
            </Button>
          </form>
        </>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
