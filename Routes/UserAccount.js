const route=require('express').Router();
const userAccount=require('../Model/UserAccount')
const cryptoJs=require('crypto-js');
//Adding the user 
route.post('/add',async(req,res)=>{
    console.log(req.body)
    const userData=new userAccount({
        username:req.body.username,
        password:cryptoJs.AES.encrypt(req.body.password,process.env.pKey).toString(),  
    });
     try {
        const userAdded=await userData.save();
        res.redirect('http://localhost:3000/home/success/User Added Successfully');
     } catch (error) {
        res.redirect('http://localhost:3000/home/success/Username already exist');
        console.log(error);
     }


})


//login user by finding
route.post('/login',async(req,res)=>{
    try{
          
        const user=await userAccount.findOne({username:req.body.username})
        
        const hashpasswor=cryptoJs.AES.decrypt(user.password,process.env.pKey);
 
       const password=hashpasswor.toString(cryptoJs.enc.Utf8)
       console.log("User is",user)
        
        console.log(user,password)
        if(password==req.body.password)
        {
            res.json(user);
        }
        else
        {
            res.json({username:"false",password:false})
        }


    }catch(err){
        res.json({username:err.message})
        console.log("In error")
    }
})

//modify the user
route.post('/modify',async(req,res)=>{
    try{
        console.log(req.body,req.body.password)
        const updatedUser= await userAccount.findOneAndUpdate({username:req.body.username},{
            $set:req.body
        },{new:true});
        res.json(updatedUser);
    }catch(err){
        res.json(err)
    }
})

route.delete('/delete/:id',async(req,res)=>{
    console.log("Deleting account with username ",req.params.id);
      try{
          const success=await userAccount.findOneAndDelete({username:req.params.id});
          res.status(200).send(success);
          console.log(success)
      }catch(err){
         res.send(err);
      }
})


//Find all users
route.get('/allusers',async(req,res)=>{
    try{
        const allusers= await userAccount.find();
        res.json(allusers);
    }catch(err){
        res.send('<h1>Error in server</h1>')
    }
})
route.get('/a',(req,res)=>{
    res.send("Hello")
})

module.exports=route;
