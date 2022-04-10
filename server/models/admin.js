const mongoose=require("mongoose");
const adminSchema= new mongoose.Schema({
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String
    },
    adminRegistrationNumber:{
        type:Number,
        required:true,
    },
    adminJoiningYear:{
        type:Number,
        required:true
    },
    adminDepartment:{
        type:String,
        required:true
    },
    adminContactNumber:{
        type:Number,
        required:true,
        unique: true,
        maxlength:10,
        minlength:10
    }
});

const Admin = new mongoose.model('Admin',adminSchema);
module.exports=Admin;