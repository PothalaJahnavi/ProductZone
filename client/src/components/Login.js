import React, { useState,useContext } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Store } from '../Store';
const Login = () => {
    const {state,dispatch:cxtdispatch}=useContext(Store)

    const navigate=useNavigate()
    const [loginData,setLoginData]=useState({
        email:'',
        password:'',
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
         setLoginData({...loginData,[name]:value})
      }
      const handleLogin=(e)=>{
        e.preventDefault()
        const {email,password}=loginData
        if(email&&password)
        {
            axios.post("http://localhost:8000/login",loginData).then((res)=>{
                if(res.data.alert)
                {
                    if(loginData.email===process.env.REACT_APP_ADMIN_EMAIL)
                    {
                      cxtdispatch({type:'ADMIN_LOGIN',payload:true})
                      cxtdispatch({type:'USER_LOGIN',payload:true})

                      toast.success("Admin Login Successfull", {
                          position: toast.POSITION.TOP_CENTER
                        }); 
                        setTimeout(()=>{
                          navigate("/")
                          
                        },1000)
                    }
                    localStorage.setItem("isLogin",true)
                    cxtdispatch({type:'USER_LOGIN',payload:true})
                    toast.success("Login Successfull", {
                        position: toast.POSITION.TOP_CENTER
                      }); 
                      setTimeout(()=>{
                        navigate("/")
                        
                      },1000)
                }
                else{
                    toast.warn(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                      }); 
                }
            })
           
        }
        else{
            toast.warn("Please Fill All Data", {
                position: toast.POSITION.TOP_CENTER
              }); 
        }

      }
  return (
    <>
    <div className='login-page'>
      <div className='login-form'>
      <h2>LOGIN</h2>
      <form>
      <div class="mb-4">
        <input type='email'  className="form-control" placeholder='Email' name='email' onChange={handleChange}/>
        </div>
        <div class="mb-4">
        <input type='password'  className="form-control" placeholder='Password' name='password' onChange={handleChange}/>
        </div>
        <div class="mb-4">
        <button type="submit" className='btn btn-success' style={{width:"100%"}} onClick={handleLogin}>Login</button>
        </div>
        <div class="mb-4">
        <p>Don't Have An Account ? <Link to="/register">Register</Link></p>
        </div>
      </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login
