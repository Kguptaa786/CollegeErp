const mongoose=require('mongoose');
const marksSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:Number,
    },
    section:{
        type:String,
        required:true
    },
    subjectCode:{
        type:Number,
        required:true
    },
    exam:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
})

const Marks=new mongoose.model('Marks',marksSchema);
module.exports=Marks;