import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HomeCard from './HomeCard'
import './Card.css'
import { Store } from '../Store'
const CartItem = () => {
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {products,cart}=state
    const params=useParams()
    const {id}=params
    const [product,setProduct]=useState("")
    console.log(products)
    useEffect(()=>{
        const result=async()=>{
        const res = products.filter((el) => el._id === id)[0]
            setProduct(res)
            console.log(res)
        }
       result()
      
    },[id])
    const handleCart=async()=>{
        const exists = cart.cartItems.find((x) => x._id === id);
        const quantity = exists ? exists.quantity + 1 : 1;
       
        cxtDispatch({
          type:"ADD_ITEM",
          payload:{...product,quantity:quantity},
        })
       //  navigate("/cart")
      }

  return (
    <>
    {product?
    <div className='row'>
   <div className='col-md-6'>
      <img src={product.image} alt="product" style={{width:"90%"}}/>
     </div>
     <div className='cart-item-desc col-md-5 '>
      <h6>{product.name}</h6>
      <p>{product.category}</p>
      <p><strong>${product.price}</strong></p>
      <div className='d-flex'style={{justifyContent:"space-between"}}>
      <button className='btn btn-warning'>Buy</button>
      <button className='btn btn-warning' onClick={handleCart}>Add To Cart</button>
      </div>
      <p><strong>Description:</strong>{product.description}</p>
      
     </div>
      
    </div>:
    <div className='card cart-product mt-5'>
      <p>loading...</p>
    </div>
}
<div className='row'>
  
</div>
    </>
  )
}

export default CartItem
