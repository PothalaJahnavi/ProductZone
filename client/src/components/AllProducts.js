import React,{useState,useEffect} from 'react'
import CardFeature from './CardFeature'
import './Card.css'
import './Home.css'
import HomeCard from './HomeCard'
import axios from 'axios'
const AllProducts = () => {
    const [productData,setProductData]=useState([])
    const loadingArray = new Array(4).fill(null);

    useEffect(()=>{
        const result=async()=>{
          const res=await axios.get("http://localhost:8000/products")
          setProductData(res.data)
        }
        result()
      },[])
    
  return (
    <div>
    <h2 style={{textAlign:"center"}}>All Products</h2>
    <div className='products-row row' >
    <div className='products-list mt-3'>
     {
      productData[0]?
      productData.map((item,index)=>{
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
      
    </div>
  )
}

export default AllProducts
