import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import PasswordInput from './shared/PasswordInput';
import { useAuthContext } from '../context/AuthContext';


const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const { login } = useAuthContext();
  const navigation = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handLoginleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }  

    setErrorMsg('')
    setIsLoading(true)

    try { 
      await login(emailRef.current.value, passwordRef.current.value);
      setIsSucceed(true);
      navigation('/');

    } catch (err) {
      setErrorMsg('Failed to log in');
      setIsSucceed(false);

    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          { errorMsg && <Message type='danger' message={errorMsg} /> }

          <Form onSubmit={handLoginleSubmit}>
            <EmailInput
              className='mb-3'
              ref={emailRef} 
            />
            <PasswordInput
              placeholder='Enter your password' 
              ref={passwordRef}
            />
            <Button 
              variant='primary'
              disabled={isLoading || isSucceed} 
              className='w-100 mt-4' 
              type='submit'>
              Login
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/reset-password'>Forgot Password?</Link>
          </div>

        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}

export default Login;
