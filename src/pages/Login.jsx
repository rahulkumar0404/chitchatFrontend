import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  Box,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import {
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { VisuallyHidden } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators.js';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const firstName = useInputValidation('');
  const lastName = useInputValidation('');
  const password = useStrongPassword();
  const bio = useInputValidation('');
  const username = useInputValidation('', usernameValidator);
  const avatar = useFileHandler('single');

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
  };
  const ErrorMessage = ({ field, ...error }) => {
    return (
      <Typography color="error" variant="caption" {...error}>
        {field.error}
      </Typography>
    );
  };
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
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
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
                onClick={handleLogin}
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
                onClick={() => setIsLogin(false)}
              >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <Box marginTop={'5rem'}>
            <Typography
              textAlign={'center'}
              fontFamily={"'Roboto', sans-serif"}
              fontSize={'2rem'}
              fontWeight={'700'}
            >
              Sign Up
            </Typography>
            <form
              style={{
                width: '100%',
                marginTop: '1rem',
              }}
            >
              <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                <Avatar
                  sx={{
                    width: '10rem',
                    height: '10rem',
                    objectFit: 'contain',
                  }}
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    color: '#ffffff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    ':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHidden
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              {avatar.error && (
                <ErrorMessage
                  field={avatar}
                  m={'1rem auto'}
                  width={'fit-content'}
                  display={'block'}
                />
              )}
              <TextField
                required
                fullWidth
                label="FirstName"
                margin="normal"
                variant="outlined"
                value={firstName.value}
                onChange={firstName.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="LastName"
                margin="normal"
                variant="outlined"
                value={lastName.value}
                onChange={lastName.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
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
                type="text"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              {password.error && <ErrorMessage field={password} />}
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                sx={{ margin: '1rem 0' }}
                onClick={handleSignUp}
              >
                Register
              </Button>

              <Typography sx={{ textAlign: 'center', margin: '1rem' }}>
                Or
              </Typography>
              <Button
                type="button"
                variant="text"
                color="secondary"
                fullWidth
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </form>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
