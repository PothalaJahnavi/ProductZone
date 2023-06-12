import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import './Card.css'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const CardFeature = ({ name, image, category, price,id }) => 
{
  const navigate=useNavigate()
   const {state,dispatch:cxtDispatch}=useContext(Store)
  const {cart}=state
  const handleCart=async()=>{
   const product={
    _id:id,
    name:name,
    category:category,
    price:price,
    image:image
   }
   const exists = cart.cartItems.find((x) => x._id === id);
   const quantity = exists ? exists.quantity + 1 : 1;
  
   cxtDispatch({
     type:"ADD_ITEM",
     payload:{...product,quantity:quantity},
   })
   toast.success("Item Added To Cart",{
    position:toast.POSITION.TOP_CENTER
  })
  setTimeout(()=>{
    navigate("/cart")
  },1000)
 }

 return (
    <div className='product-data'>
        <div class="card product">
                    <Link to={`/product/${id}`}>
                    <img className='product-img' src={image} alt="product" />
                    </Link>                     
                     <div class="card-body product-info">
                     <Link to={`/product/${id}`}>
                      <p>{name}</p>
                      </Link>
                      <p>{category}</p>
                      <p><strong>${price}</strong></p>
                        <button className='btn btn-warning' onClick={handleCart}>Add To Cart</button>
                                            
                     </div>
                    </div>
                    <ToastContainer/>
    </div>
  )
}

export default CardFeature
