const mongoose=require("mongoose")

const DataSchema=new mongoose.Schema({

country:String,
model:String,
correlation:Number,
mae:Number,
rmse:Number

})

module.exports=mongoose.model("Data",DataSchema)