const route=require('express').Router();
const leave=require('../Model/Leave');
route.post('/add',async (req,res)=>{
      const data=req.body;
      const leaveData=new leave({
        userName:req.body.userName,
        leaveStart:req.body.leaveStart,
        leaveEnd:req.body.leaveEnd,
        leaveReason:req.body.leaveReason
      });
      console.log(data,leaveData);

      try{
              const uploadedRequiest= await leaveData.save();
              res.redirect('/home/success/')
              
      }catch(Err){
         res.json(Err);
      }
})


route.get('/all',async(req,res)=>{
       const allrequest=await leave.find({
        response:"pending"
       });
       res.json(allrequest);
})

route.put('/approved/:id',async(req,res)=>{
  console.log(req.params.id)
       try{
                const update= await leave.findByIdAndUpdate(req.params.id,{
                  response:"Approved"
                },{new:true})
                console.log(update)
                res.json(update)
       }catch(err){
         res.json(err);
       }
})

route.put('/reject/:id',(async(req,res)=>{
           try{
                   const rej=await leave.findByIdAndUpdate(req.params.id,{
                     response:"Reject"
                   },{new:true})
                   console.log(rej)
                   res.json(rej);
           }catch(err)
           {
              res.json(err);
           }
}))


route.get('/findByUserName/:username',async(req,res)=>{
   console.log(req.params.username)
           try{
                    const data= await leave.find({userName:req.params.username});
                    res.json(data);
                    console.log("Specivif request is ",data)
           }catch(e){
            res.json(e);
           }
})

module.exports=route;
