const mongodb=require('mongoose');
const accountSchemma=new mongodb.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongodb.model("userAcc",accountSchemma);