import React, { useState } from 'react'
import { Container } from '../../components/home/homeStyled'
import { AuthContainer, Form, Wrapper } from './authStyled'
import { Button, Grid } from '@mui/material'
import Input from './Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loginAsyncThunk, registerAsyncThunk } from '../../redux/features/authSlice'

const Auth = () => {
  const user = localStorage.getItem('user')
  const [userExists, setUserExists] = useState(user ? true : false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { firstName, lastName, password, email, confirmPassword } = formData
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userExists) {
      dispatch(registerAsyncThunk(formData))
        .unwrap()
        .then(() => {
          toast.success('Welcome to LuxeLoom!')
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.message || 'Registration failed')
        })
    } else {
      dispatch(loginAsyncThunk({ email, password }))
        .unwrap()
        .then(() => {
          toast.success('Welcome back to LuxeLoom!')
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.message || 'Login failed')
        })
    }
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const switchMode = () => {
    setUserExists((prevUserExists) => !prevUserExists)
    setShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Container>
      <Wrapper>
        <AuthContainer style={{ height: !userExists? '80%' : '55%' }}>
          <Form>
            <Grid container spacing={3}>
              {!userExists && (
                <>
                  <Input
                    value={firstName}
                    name="firstName"
                    label={'First Name'}
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    value={lastName}
                    name="lastName"
                    label={'Last Name'}
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                value={email}
                name="email"
                label={'Email '}
                handleChange={handleChange}
                type={'email'}
              />
              <Input
                value={password}
                name="password"
                label={'Password'}
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {!userExists && (
                <Input
                  value={confirmPassword}
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type={'submit'}
              fullWidth
              variant={'contained'}
              color={'primary'}
              style={{ marginTop: '5px' }}
              onClick={handleSubmit}
            >
              {!userExists ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={switchMode}>
                  {!userExists
                    ? 'Already have an account ? Sign In  '
                    : 'Don\'t have an account ? Sign Up'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </AuthContainer>
      </Wrapper>
    </Container>
  )
}

export default Auth