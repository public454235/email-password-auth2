import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.config';


const auth = getAuth(app)

const RegisterBS = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef()
  const handlePasswordBS = (event) => {
    event.preventDefault();
    const from =event.target;
    const email =from.email.value
    const password =from.password.value;
    console.log(email, password)

    setError('')
    setSuccess('')
    if(!/(?=.*[A-Z])/.test(password)){
      setError('please string has two uppercase letters.')
      return
    }
    else if(!/(?=.*[0-9].*[0-9])/.test(password)){
      setError('Please string has two digits.')
      return;
    }
    else if(password.length <6){
      setError('Please string is of length 6')
      return
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const loggedUser = result.user
      console.log(loggedUser)
      if(!loggedUser.emailVerified){

      }
      setSuccess('User Login Success full')
      setError('')
    })
    .catch(error => {
      setError(error.message)
    })
   
  }
  const handleResetPassword = (event) =>{
    const email = emailRef.current.value;
    if(!email){
      alert('Please provide your email address to reset password')
      return
    }
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('Please check your email')
    })
    .catch(error=>{
      console.log(error)
      setError(error.message)
    })
  }
  return (
    <div className='w-25 mx-auto'>
      <h4 className='text-success'>Login</h4>
      <form onSubmit={handlePasswordBS}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name='email' ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
      <p><small>New to this website? Please <Link to='/resister'>Register</Link></small></p>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
    </div>
  );
};

export default RegisterBS;