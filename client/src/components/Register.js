import React from 'react'
import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import axios from 'axios'
import { Base64 } from '../Base64'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
    const [registerData,setRegisterData]=useState({
        name:'',
        email:'',
        password:'',
        cfrmpassword:'',
        image:'',
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
         setRegisterData({...registerData,[name]:value})
      }
  const handleRegister=(e)=>{
    e.preventDefault()
    const {name,email,password,cfrmpassword}=registerData
    if(name&&email&&password&&cfrmpassword)
    {
       if(password===cfrmpassword)
       {
               axios.post("http://localhost:8000/register",registerData).then((res)=>{
                console.log(res.data)
                if(res.data.alert)
                {
                  toast.success("User Registered Successfully.Please Login",{
                    position:toast.POSITION.TOP_CENTER
                  })
                  setTimeout(()=>{
                     navigate("/login")
                  },1000)
                }
                else{
                  toast.warn("User Already Exites",{
                    position:toast.POSITION.TOP_CENTER
                  })
                }
               })


       }
       else{
        toast.warn("Password and Confirm Password should match", {
          position: toast.POSITION.TOP_CENTER
        });    
         }
    }
    else{
      toast.warn("Please Fill All Data", {
        position: toast.POSITION.TOP_CENTER
      }); 
    }
  }

const handleProfileChange=async(e)=>{
  const data=await Base64(e.target.files[0]);
  setRegisterData((preve)=>{
    return{
      ...preve,
      image : data
    }
})

}

  return (
    <>
    <div className='login-page'>
    <div className='login-form' style={{paddingTop:"2%"}}>
    <h2 style={{margin:"auto"}}>REGISTER</h2>
    <form>

    <div className="mb-4" style={{margin:"auto"}}>
    <img src={registerData.image ? registerData.image :  avatar} style={{width:"30%",height:"25vh",position:"relative",borderRadius:"100%"}} />

    <label htmlFor="profileImage">
      <div  style={{opacity:"50",cursor:"pointer",position:"absolute"}}>
        <p className="" style={{marginLeft:"-355%",marginTop:"30px"}}>Upload</p>
      </div>
      <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleProfileChange} style={{marginLeft:"-23%",height:"10vh",position:"absolute",opacity:"0"}}/>
    </label>
  </div>

    <div class="mb-4">
    <input type='name'  className="form-control" placeholder='Name' name='name' onChange={handleChange}/>
    </div>
    <div class="mb-4">
      <input type='email'  className="form-control" placeholder='Email' name='email' onChange={handleChange}/>
      </div>
      <div class="mb-4">
      <input type='password'  className="form-control" placeholder='Password' name='password' onChange={handleChange}/>
      </div>
      <div class="mb-4">
      <input type='password'  className="form-control" placeholder='Confirm Password' name='cfrmpassword' onChange={handleChange}/>
      </div>
      <div class="mb-4">
      <button type="submit" className='btn btn-success' style={{width:"100%"}} onClick={handleRegister}>Register</button>
      </div>
      <div class="mb-4">
      <p>Already Have An Account ? <Link to="/login">Login</Link></p>
      </div>
    </form>
    </div>
  </div>
  <ToastContainer/>
  </>
  )
}

export default Register
