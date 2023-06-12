const Products=require("../models/product")

const register=async(req,res)=>{
         const newProduct=new Products({
             name:req.body.name,
             category:req.body.category,
             description:req.body.description,
             price:req.body.price,
             image:req.body.image
           })
           newProduct.save()
           res.send({message:"successfully saved",alert:true})
    
    
 }
const getAllProducts=async(req,res)=>{
    const data = await Products.find({})
    res.send(JSON.stringify(data))
}

const getByid=async(req,res)=>{
    try{
      const {id}=req.params
      const data=await Products.findOne({id:id})
      res.json(data)
    }
    catch(err){
    if(err)
    console.log(err)
    }
}
 module.exports={register,getAllProducts,getByid}