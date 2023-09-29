const expres=require('express');
const app=expres();
const bodyParser = require('body-parser');
const userAccount=require('./Routes/UserAccount');
const userDetail=require('./Routes/UserDetail');
const leave=require('./Routes/Leave')
const mongodb=require('mongoose')
const path=require('path');
const envdot=require('dotenv')
envdot.config();
app.use(expres.urlencoded({extended:true}))
app.use(expres.json());
mongodb.connect(process.env.mongo_pass).then(()=>{console.log("Successfully connnected to server")}).catch((err)=>{
    console.log(err)
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.set('view engine', 'ejs');

//Need to understand
// app.get("/update",(req,res)=>{
//     res.sendFile(path.join(__dirname,'./Rough/Udpade.html'));
// })
app.use('/account',userAccount);  //deals with account detail
app.use("/uDetail",userDetail);    //Deals with user detail
app.use("/leave",leave);
app.get('/udpateUserDetail',(req,res)=>{
    res.sendFile(path.join(__dirname,'./Rough/UpdateUserDetail.html'))
})
app.get('/giveuDetail',(req,res)=>{
    res.sendFile(path.join(__dirname,'./Rough/userdetail.html'))
})
app.get('/getform',(req,res)=>{
    res.redirect('http://localhost:3000/edetail');
    // res.send("H");
})

app.listen(8000,()=>{
    console.log("Server is started on port 8000");
})