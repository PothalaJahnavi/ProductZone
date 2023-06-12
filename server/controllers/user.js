const Users=require("../models/user")
const bcrypt=require("bcryptjs")

const register=async(req,res)=>{
   const {email}=req.body
   Users.findOne({email:email}).then((result)=>{
     
    if(result){
        res.send({ message: "Email id is already register", alert: false });
    }
    else{
        const newUser=new Users({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
            image:req.body.image
          })
          newUser.save()
          res.send({message:"successfully registered",alert:true})
    }
   }).catch((err)=>{
    console.log(err)
   })
   
}
const login=async(req,res)=>{
    const {email}=req.body
    Users.findOne({email:email}).then((result)=>{
        if(result){
            if(bcrypt.compareSync(req.body.password,result.password))
            res.send({message:"User Login successfull",alert:true})
            else
            res.send({message:"Password Incorrect",alert:false})

        }
        else{
            res.send({message:"Invalid Email",alert:false})
        }
    }).catch((err)=>{
        console.log(err)
    })
}




module.exports={register,login}

