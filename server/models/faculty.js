const mongoose=require("mongoose");
const facultySchema= new mongoose.Schema({
    facultyName:{
        type:String,
        required:true
    },
    facultyEmail:{
        type: String,
        required: true,
        unique:true
    },
    password:{
       type:String
    },
    facultyDesignation:{
        type:String,
        required:true
    },
    facultyRegistrationNumber:{
        type:Number,
        required:true,
    },
    facultyJoiningYear:{
        type:Number,
        required:true
    },
    facultyDepartment:{
        type:String,
        required:true
    },
    facultyDob:{
     type:Date,
     required:true
    },
    facultyGender: {
        type: String,
        enum: ["male", "female"]
    },
    facultyContactNumber:{
        type:Number,
        required:true,
        unique: true,
        maxlength:10,
        minlength:10
    },
    facultyAdharNumber:{
        type:Number,
        unique:true,
        maxlength:12,
        minlength:12
    },
    otp: {
        type: String
    }

});

const Faculty = new mongoose.model('Faculty',facultySchema);
module.exports=Faculty;