import React, { useState, useEffect, useReducer, useRef } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import Input from '../Input/Input'

//state->lastsnapshot, action->the function that going to dispatch
//we shod
const emailReducer = (state, action) => {
  if (action.type === 'userInput') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'inputBlur') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

//For the 'userInput', we use action.val, is because we want to retrieve the value from payload,
//however, for the 'inputBlur' , we want to retrieve the value from the return state
const passwordReducer = (state, action) => {
  if (action.type === 'userInput') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'inputBlur') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  //the useeffect will not call when the isValid is not change
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validaity!')
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)
    return () => {
      console.log('cleanup')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  //type->describe what happen, extraplayload->the value user emter
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'userInput', val: event.target.value })
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'userInput', val: event.target.value })
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'inputBlur' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'inputBlur' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type='email'
          id='email'
          title='E-mail'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type='password'
          id='password'
          title='Password'
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
