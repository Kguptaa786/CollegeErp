const mongoose=require('mongoose');
const attendenceSchema=new mongoose.Schema({
    student: {
        type: String,
        ref: 'student'
    },
    subject: {
        type: String,
        ref: 'subject'
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
    totalLecturesByFaculty: {
        type: Number,
        default:0
    },
    lectureAttended: {
        type: Number,
        default:0
    }

})

const Attendence=new mongoose.model('Attendence',attendenceSchema);
module.exports=Attendence;