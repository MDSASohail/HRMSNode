const leave=require('mongoose');
const leaveSchemma=new leave.Schema({
    userName:{type:String,required:true},
    leaveStart:{type:String,required:true},
    leaveEnd:{type:String,required:true},
    leaveReason:{type:String,required:true},
    response:{type:String,default:"pending"}
},{timestamps:true});

module.exports=leave.model("LeaveRequest",leaveSchemma);