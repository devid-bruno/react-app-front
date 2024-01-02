import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useMutation } from 'react-query'
import { login } from '../../services/auth';
import { displayError, toast } from '../../utils'; 
import { useForm } from "react-hook-form"
import { formValidation } from './validations'
import { yupResolver } from "@hookform/resolvers/yup"
import { queryClient } from '../../libs'
import { meKey } from '../../consts/queries'

function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Doka! Paineis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673AB7',
    },
  },
});



export function Login () {
  const [isLoginDisabled, setIsLoginDisabled] = useState(true)

  const navigate = useNavigate()

  const formOptions = { resolver: yupResolver(formValidation) }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm(formOptions)

  const { mutate, isLoading } = useMutation(login, {
    onError(error: any) {
      if (!error?.type) toast.messsage('400', error)
      displayError({ error, setError })
      setIsLoginDisabled(false)
    },
    onSuccess(data) {
      queryClient.setQueryData(meKey, data)
      navigate('/')
    }
  })

  async function handleSingIn(value: any) {
    mutate(value)
  }

  const handleDisabledButton = () => {
    setIsLoginDisabled(false)
}

  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSingIn)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email de Usuário"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              onKeyUp={handleDisabledButton}
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              disabled={isLoginDisabled}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Logar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
