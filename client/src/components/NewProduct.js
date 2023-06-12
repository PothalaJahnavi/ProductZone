import React from 'react'
import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import axios from 'axios'
import { Base64 } from '../Base64'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import upload from '../assets/upload.jpg'
const NewProduct = () => {
    const navigate=useNavigate()
    const [productData,setProductData]=useState({
        name:'',
        category:'',
        description:'',
        price:'',
        image:'',
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
         setProductData({...productData,[name]:value})
      }
  const handleImage=(e)=>{
    e.preventDefault()
    const {name,category,description,price,image}=productData
    if(name&&category&&description&&price&&image)
    {
        axios.post("http://localhost:8000/newProduct",productData).then((res)=>{
            if(res.data.alert)
            {
              toast.success(res.data.message,{
                position:toast.POSITION.TOP_CENTER
              })
              // setTimeout(()=>{
              //    navigate("/")
              // },1000)
            }
            else{
              toast.warn("There is some error in saving.Try again",{
                position:toast.POSITION.TOP_CENTER
              })
            }
           })
    }
    else{
      toast.warn("Please Fill All Data", {
        position: toast.POSITION.TOP_CENTER
      }); 
    }
  }

const handleImageUpload=async(e)=>{
  const data=await Base64(e.target.files[0]);
  setProductData((preve)=>{
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
    <h2>ADD NEW PRODUCT</h2>
    <form>

    <div class="mb-4">
    <input type='text'  className="form-control" placeholder='Name' name='name' onChange={handleChange}/>
    </div>
    <div class="mb-4">
      <textarea type='text'  className="form-control" placeholder='description' name='description' onChange={handleChange}/>
      </div>
      <div class="mb-4">
      <select class="form-select" aria-label="Default select example" name='category' onChange={handleChange}>
        <option value="other">Select category</option>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="cakes">Cakes</option>
        <option value="ice-cream">Ice Cream</option>
        <option value="drink">Drink</option>
        <option value="chicken">Chicken</option>
        <option value="curry">Curry</option>
        <option value="rice">Rice</option>

        </select>
      </div>
      <div class="mb-4">
      <input type='text'  className="form-control" placeholder='Price' name='price' onChange={handleChange}/>
      </div>
      <div class="mb-4">
      <input type='file'  className="form-control" placeholder='Upload Image' name='image' onChange={handleImageUpload}/>
      </div>
      <div class="mb-4">
      {
        productData.image?<img src={productData.image} style={{width:"100%",height:"50%"}}/>:<img src={upload} style={{width:"100%",height:"50%"}}/>
      }
      </div>
      <div class="mb-4">
      <button type="submit" className='btn btn-success' style={{width:"100%"}} onClick={handleImage}>ADD PRODUCT</button>
      </div>
    </form>
    </div>
  </div>
  <ToastContainer/>
  </>
  )
}

export default NewProduct
