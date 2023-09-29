const mongodb=require('mongoose');

const userDetail=new mongodb.Schema({
    firstName:{type:String,required:true},
    middleName:{type:String},
    lastName:{type:String},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    mobile:{type:Number,required:true},
    mobileHome:{type:Number,required:true},
    supervisor:{type:String,required:true},
    emailId:{type:String,required:true},
    department:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    hiredDate:{type:String},
    salary:{type:Number,required:true}

},{timestamps:true});

module.exports=mongodb.model("UserDetail",userDetail);