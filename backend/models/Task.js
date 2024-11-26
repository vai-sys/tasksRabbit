const mongoose=require("mongoose");
const User=require("User")
const TaskSchema=mongoose.Schema({
  task:{
    type:String,
    required:true
  }
  ,
  status:{
    type:String,
    enum: ['pending', 'Completed', 'In-progress']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

const Task=mongoose.model("User",TaskSchema)
module.exports=Task;