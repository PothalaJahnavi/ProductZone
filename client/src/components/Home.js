import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './Home.css'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import c4 from '../assets/c4.png'
import cu6 from '../assets/cu6.png'
import CardFeature from './CardFeature'
import HomeCard from './HomeCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Store } from '../Store'
const Home = () => {
   const [productData,setProductData]=useState([])
   const [category,setCategory]=useState([])
  const [filter,setFilter]=useState("fruits")
  const [filterData,setFilterData]=useState([])
   const loadingArray = new Array(5).fill(null);
   const {state,dispatch:cxtDispatch}=useContext(Store)
   
  useEffect(()=>{
    const result=async()=>{
      const res=await axios.get("http://localhost:8000/products")
      setProductData(res.data)
      cxtDispatch({type:'SET_PRODUCTS',payload:res.data})
      
      const cat=[...new Set((res.data).map(item=>item.category))]
      setCategory(cat)
    }
    result()
  })

  useEffect(()=>{
   const myData=productData.filter(item=>item.category.toLowerCase()===filter.toLowerCase())
   setFilterData(myData)
   console.log(filterData)
  },[filter])



  return (
    <div className='home-page'>
     <div className='row' style={{paddingBottom:"15vh"}}>
     <div className='col-md-7 '>
       <h2 style={{fontWeight:"600",fontSize:"60px",textAlign:"left"}}>Restaurants in your pocket.. {""}
       <span style={{color:"Red",fontWeight:"600"}}>Order Online</span>
       </h2>
       
       <p style={{lineHeight:"2",letterSpacing:"5"}}>If you consider yourself a foodie or just absolutely love great culinary experiences; Seafood Kitchen is just the day trip you have been looking for. The entire concept is designed around a boutique Slow Food adventure where small groups will get to Tour, Try and Taste like locals throughout the journey.</p>
     </div>
     <div className='col-md-4 col-sm-12'>
      <div className='home-products'>
      <div className='home-product'>
       <img src={img1} style={{width:"90%",height:"70%"}} alt="product"/>
      </div>
      <div className='home-product'>
      <img src={c4} style={{width:"90%",height:"70%"}} alt="product"/>
     </div>
     <div className='home-product'>
     <img src={cu6} style={{width:"90%",height:"70%"}} alt="product"/>
     </div>
     <div className='home-product'>
     <img src={img2} style={{width:"90%",height:"70%"}} alt="product"/>
     </div>
      </div>
     </div>
     </div>
     <div className='row'>
      <div className='col-md-10'>
      <h2>Featured Items </h2>
      </div>
      <div className='col-md-1'>
      <Link to="/all-products" style={{float:"end",fontSize:"20px"}} >More</Link>
      </div>
     </div>
      
     <div className='products-row row' >
      <div className='products-list mt-3'>
       {
        productData[0]?
        productData.slice(1,6).map((item,index)=>{
          return(
            <CardFeature
            key={item._id+"vegetable"}
            id={item._id}
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
          />
          )
        }):
        loadingArray.map((el, index) => {
          return <HomeCard key={index+"loading"} loading={"Loading..."} />;
        })}
      </div>
     </div>
     <div className='row mt-5 mb-5'>
     <h2>What's in your mind?</h2>
      <div className='category-list mt-4' style={{margin:"auto",justifyContent:"center",textAlign:"center",alignItems:"center"}}>
      {category&&category.map((item)=>{
        return(
        <div className='category' style={{cursor:"pointer"}} onClick={()=>setFilter(item)}>
        <p>{item}</p>
        </div>
        )
      })
      }
    
      </div>
     </div>
     <div className='row pb-5'>
     <div className='products-list mt-3'>

     {
       filterData&&filterData.map((item,index)=>{
          return(
            <CardFeature
            key={item._id+"vegetable"}
            id={item._id}
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
          />
          )
        })
     }
     </div>
     </div>
    </div>
  )
}

export default Home
