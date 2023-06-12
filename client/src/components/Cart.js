import React from 'react'
import { Store } from '../Store'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import './Card.css'
import axios from 'axios'
const Cart = () => {
  const {state,dispatch:cxtDispatch}=useContext(Store)
  const {cart:{cartItems }}=state
  const updateQuantity=async (item,quantity)=>{
    cxtDispatch({
      type:"ADD_ITEM",
      payload:{...item,quantity:quantity},
    })
  }
  const handleRemove=async(item)=>{
    cxtDispatch({type:'REMOVE_ITEM',payload:item})
  }

  const handlePayment=async()=>{
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
   const res=await axios.post("http://localhost:8000/payment",cartItems)
   const data=await res.data
   console.log(data)
   if(res.statusCode==500)
   return;
  //  const data=await res.data
   alert("redirecting to payment...")
   stripePromise.redirectToCheckout({sessionId:data}) 

  }
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Shopping Cart</h1>
      <div className="row" style={{padding:"40px"}}>
        <div className="col-md-8">
        {
            
            cartItems.length===0? <>
            <h5>Cart Is Empty</h5>
            <Link to="/">Shop Now</Link>
            </>:
            <ul class="list-group">
             {
                cartItems.map((item,index)=>{
                    return(
                        <>
                           <li class="cart-items list-group-item">
                            <div className="row " style={{alignItems:"center",textAlign:"center"}}>
                              <div className="col-md-4">
                              <img  className='' src={item.image} alt="" style={{width:"50%",height:"20vh"}} />
                            {' '}
                            <Link to={`/product/${item._id}`}>
                             <p>{item.name}</p>
                            </Link>
                            {' '}
                              </div>
                             <div className="col-md-3">
                             <button className="btn btn-warning" style={{border:"none",borderRadius:"180px"}} onClick={()=>updateQuantity(item,item.quantity-1)}>
                            -
                             </button>{' '}
                             <span>{item.quantity}</span>{' '}
                             <button className="btn btn-warning" style={{border:"none",borderRadius:"180px"}} onClick={()=>updateQuantity(item,item.quantity+1)}>+</button>

                             </div>
                             <div className="col-md-2">
                                ${item.price}
                             </div>
                             
                             <div className="col-md-3">
                             <button style={{border:"none",background:"none"}} onClick={()=>handleRemove(item)}>  <i className="fas fa-trash"></i></button>
                             </div>
                            
                            </div>
                           
                           </li>
                        </>
                    )
                })
             }    
            </ul>
           
        }
        </div>

        <div className="col-md-4">
        <ul class="list-group ">
        <li class="list-group-item cart-items"><strong>
         Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </strong>
                    
        </li>
        <li class="list-group-item cart-items" style={{padding:"auto",textAlign:"center"}}><button onClick={handlePayment} className='btn btn-success'>Proceed To Payment</button></li>
                
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Cart
