const express=require('express')
const mongoose=require('mongoose')
const cors=require("cors")
const dotenv = require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const userApi=require('./routes/user')
const productApi=require("./routes/product")

const app=express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(userApi)
app.use(productApi)

const CONNECTION_URL=process.env.MONGO_URL
const PORT=8000

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log("database Connected")
}).catch((err)=>{
  console.log(err)
})

app.post("/payment",async(req,res)=>{

   try{

     const session=await stripe.checkout.sessions.create({
      submit_type : 'pay',
      mode : "payment",
      payment_method_types : ['card'],
      billing_address_collection : "auto",
      line_items : req.body.map((item)=>{
          return{
            price_data : {
              currency : "inr",
              product_data : {
                name : item.name,
              },
              unit_amount : item.price * 100,
            },
            adjustable_quantity : {
              enabled : true,
              minimum : 1,
            },
            quantity : item.quantity
          }
        }),
        success_url : `${process.env.FRONTEND_URL}/success`,
        cancel_url : `${process.env.FRONTEND_URL}/cancel`,

     })
    res.status(200).json(session.id)

   }
   catch(err){
     
    res.status(500).json(err.message)
   }

// const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//      success_url : `${process.env.FRONTEND_URL}/success`,
//         cancel_url : `${process.env.FRONTEND_URL}/cancel`,
  // });

//   res.json({ url:session.url});
// res.send({message:"Payment gateway....",success:true})
});







//   try{
//     const params = {
//         submit_type : 'pay',
//         mode : "payment",
//         payment_method_types : ['card'],
//         billing_address_collection : "auto",
//         shipping_options : [{shipping_rate : "shr_1NDPnWSHG5wFrMSe1IlMhL2v"}],

//         line_items : req.body.map((item)=>{
//           return{
//             price_data : {
//               currency : "inr",
//               product_data : {
//                 name : item.name,
//               },
//               unit_amount : item.price * 100,
//             },
//             adjustable_quantity : {
//               enabled : true,
//               minimum : 1,
//             },
//             quantity : item.quantity
//           }
//         }),

//         success_url : `${process.env.FRONTEND_URL}/success`,
//         cancel_url : `${process.env.FRONTEND_URL}/cancel`,

//     }
//     const session = await stripe.checkout.sessions.create(params)
//     console.log(session)
//       res.send({sessionId:session.id})
//      }

//   catch(err){
//     console.log(err)
//   }
// })




app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})
