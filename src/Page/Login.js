import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Container from '../Container/Container'

import { Input, Row, Button, Radio } from 'antd'
import InputErrorMessage from '../components/InputErrorMessage'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

const Login = () => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)
  const [radioValue, setRadioValue] = useState(true)
  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) {
      setErrorMessage(true)
    }
    else if (!password.trim()) {
      setErrorMessage(true)
    }
    else if (appState.appEmail === email || appState.appPassword === password) {
      appDispatch({ type: "calendarOrPostJob", value: radioValue })
      setErrorMessage(false)
      navigate("/home")
    }
  }

  const onChange = (e) => {
    // console.log('radio checked', e.target.value)
    setRadioValue(e.target.value)

  }
  return (
    <Container title="Login" className="Login">
      <div className="welcome">
        <Row>
          <div className="brand">
            <img src="/img/logo-hr.png" alt="logo" />
            <span>Freeboh</span>
          </div>
        </Row>
        <h1>Login using your Email!</h1>
        <p>Please enter your email and Password to login to freeboh</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="email">Email</label>
          <Input onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" placeholder='xyz@gmail.com' autoComplete='off' />

        </div>
        <div className="input-block">
          <label htmlFor="password">Password</label>
          <Input onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" type="password" placeholder="Type here" autoComplete='off' />

        </div>
        <div className="input-block">
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio data-testid="radio-button-one" value={true}>Post Job</Radio>
            <Radio data-testid="radio-button-two" value={false}>Calendar</Radio>
          </Radio.Group>
          {errorMessage && <InputErrorMessage />}
        </div>
        <div className="forget-password">
          <Row className="justify-content-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </Row>
        </div>
        <div className="login-buttons">
          <Button htmlType="submit" className='login' block>Login</Button>
          <div className="divider">
            <hr />
            <span>Or</span>
          </div>
          <Button type='primary' className='fb-login' block icon={<img src="/img/fb.png" alt='' />}>Continue with Facebook</Button>
          <Button type='primary' className='twitter-login' block icon={<img src="/img/twitter.png" alt='' />}>Continue with Twitter</Button>
          <Button type='primary' className='google-login' block icon={<img src="/img/google.png" alt='' />}>Continue with Google</Button>
        </div>
      </form>
      <div className="sign-up">
        <Row className="justify-content-center">
          <span>Don't have an account? <Link to="/sign-up"><b>Sign Up!</b></Link></span>
        </Row>
      </div>

    </Container>
  )
}

export default Login