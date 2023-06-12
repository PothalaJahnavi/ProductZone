const express=require("express")
const router=express.Router()
const {register,getAllProducts, getByid}=require("../controllers/product")

router.post("/newProduct",register)
router.get("/products",getAllProducts)
router.get("/product/:id",getByid)
module.exports=router