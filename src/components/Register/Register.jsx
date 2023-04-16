import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState()
    const handleSubmit = (event)=>{
        event.preventDefault ();
        setSuccess('')
        const email = event.target.email.value
        const password = event.target.password.value
        console.log(email, password)
        if(!/(?=.*[A-Z])/.test(password)){
            setError('please add at least one uppercase');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Ensure string has two digits.')
            return
        }
        else if(password.length <6){
            setError('Ensure string is of length 6.')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user
            console.log(loggedUser)
            setError('');
            event.target.reset()
            setSuccess('User has created success full')
        })
        .catch(error =>{
            console.error(error.message)
            setError(error.message)
            
        })
        const 
    }
    const handleEmailChang = (event)=>{
        // console.log(event.target.value)
        // setEmail(event.target.value)
    }
    const handlePassword = (event)=>{
        console.log(event.target.value)
    }
    return (
        <div className='w-50 mx-auto'>
            <h4>This is Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mx-auto mb-4 rounded ps-2' onClick={handleEmailChang} type="email" name="email" id="email" placeholder='Your email' required />
                <br />
                <input className='w-50 mx-auto mb-4 rounded px-2' onBlur={handlePassword} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
                <p><small>Already have an account: Please <Link to='/register-bs'>RegisterBS</Link></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>
            
        </div>
    );
};

export default Register;