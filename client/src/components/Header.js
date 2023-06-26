import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useContext } from 'react';
import { Store } from '../Store';
const Header = () => {
    const {state,dispatch:cxtdispatch}=useContext(Store)
    const {isLogin,cart,isAdmin}=state


    const handleLogout=()=>{
        localStorage.removeItem("isLogin")
        cxtdispatch({type:'USER_LOGOUT'})
        cxtdispatch({type:'ADMIN_LOGIN',payload:false})
    }
    useEffect(()=>{
    console.log(localStorage.getItem("isLogin"))
    },[isLogin])
  return (
    <div>
    <nav class="navbar navbar-expand-lg justify-content-end" style={{backgroundColor:"aliceblue"}}>
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Delivery</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      <li class="nav-item">
            <Link to="/" class="nav-link" aria-current="page" >Home</Link>
          </li>
          <li class="nav-item">
            <Link to="all-products" class="nav-link">Menu</Link>
          </li>
       
        {
            isLogin?<>
            <li class="nav-item">
            <Link class="nav-link" to="/cart">
            {
                cart.cartItems.length>0?
                <Badge badgeContent={cart.cartItems.length} color="secondary">
                <ShoppingCartIcon fontSize="small" style={{color:"grey"}} />
                </Badge>:
                <ShoppingCartIcon fontSize="small" style={{color:"grey"}}/>
            }
            
          </Link>          </li>
          {isAdmin&&
            <li class="nav-item">
            <Link to="/newProduct" class="nav-link ">New Product</Link>
          </li>
        }
         
          <li class="nav-item">
          <Link class="nav-link " onClick={handleLogout}>Logout</Link>
        </li>
            </>:
            <>
            <li class="nav-item">
            <Link to="/register" class="nav-link ">Register</Link>
          </li>
          <li class="nav-item">
          <Link to="/login" class="nav-link ">Login</Link>
        </li>
            </>
        }
       
     
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Header
