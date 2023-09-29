const route=require('express').Router();
const userDetail=require('../Model/UserDetail');


//Adding the userDetail on the database
route.post('/add',async(req,res)=>{
    const detail = new userDetail({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        employeeId: "M01",
        gender: req.body.gender,
        address: req.body.address,
        mobile: req.body.mobile,
        mobileHome: req.body.mobileHome,
        supervisor: req.body.supervisor,
        emailId: req.body.emailId,
        department: req.body.department,
        hiredDate: new Date(), // Use the current date
        userName:req.body.userName,
        salary:req.body.salary
        
      });
      

         try{
             const addedDetail=await detail.save();
             const fname = addedDetail.firstName;
              const lname = addedDetail.lastName;
              const mname = addedDetail.middleName;
              const address=addedDetail.address;
              const mobile=addedDetail.mobile;
              const email=addedDetail.emailId;
              const mobile2=addedDetail.mobileHome;
              const supervisor=addedDetail.supervisor;
              const gender=addedDetail.gender;
              const department=addedDetail.department;
              const username=addedDetail.userName;
              const salary=addedDetail.salary;
              const head="Form Submitted Successfylly"
              console.log(addedDetail);
              res.render('h',{fname,lname,mname,address,mobile,email,mobile2,supervisor,gender,department,head,username,salary});
         }catch(err){
            res.json(err);
         }
})
//getting all userDetail
route.get('/allDetail',async(req,res)=>{
    try{
          const alldata=await userDetail.find();
          const data=alldata.data;
          console.log(alldata)
          res.json(alldata)
    }catch(err){
        res.json(err);
    }
})

// Getting userDetail by username
route.get("/userDetail",async (req,res)=>{
    try{
        console.log("Request is ",req.query.userName)
        const userData=await userDetail.findOne({userName
            :req.query.userName});
        if(userData==null)
        {
            // res.redirect('http://localhost:3000/home/fillEDetail')
            res.json({result:false})
            console.log(userData)
            return;
        }
        const fname = userData.firstName;
              const lname = userData.lastName;
              const mname = userData.middleName;
              const address=userData.address;
              const mobile=userData.mobile;
              const email=userData.emailId;
              const mobile2=userData.mobileHome;
              const supervisor=userData.supervisor;
              const gender=userData.gender;
              const department=userData.department;
              const head="User Detail"
            //   res.render('h',{fname,lname,mname,address,mobile,email,mobile2,supervisor,gender,department,head});
            res.json(userData)
            console.log(userData)

    }catch(err){
        res.json(err);
        console.log(err.message)
    }
})


//findby id
route.get('/byid/:id',async(req,res)=>{
    console.log("Searching by id");
       const url=req.url.split('/')[2];
       console.log(url)
    try{
           const data=await userDetail.findById(url);
           res.json(data);
    }catch(err)
    {
        res.json(err)
    }
    
})


//updating the userDetail
route.post('/update',async(req,res)=>{
    try{
        const updateData=await userDetail.findOneAndUpdate({userName:req.body.userName},{
            $set:req.body
        },{new:true})
        const fname = updateData.firstName;
              const lname = updateData.lastName;
              const mname = updateData.middleName;
              const address=updateData.address;
              const mobile=updateData.mobile;
              const email=updateData.emailId;
              const mobile2=updateData.mobileHome;
              const supervisor=updateData.supervisor;
              const gender=updateData.gender;
              const department=updateData.department;
              const head="Updated User Detail"
              res.render('h',{fname,lname,mname,address,mobile,email,mobile2,supervisor,gender,department,head});
    }catch(err){
        res.json(err)
    }
})




//Deleting userDetail
route.delete('/delete/:id',async (req,res)=>{
    try{
             const id=req.params.id;
              const deleteData=await userDetail.findByIdAndDelete(id)
              res.send("Data deleted successfully");
            
            // console.log("Deleting data with id ",id)
            // res.send("Ok")
    }catch(err){
        res.json(err);
    }
})


module.exports=route;