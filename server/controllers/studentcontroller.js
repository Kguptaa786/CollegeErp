const Student=require('./model/student.js');
studentLogin:async(req,res,next)=>{
    try{
        const{registrationnumber,password}=req.body;
        const student=await Student.findOne({studentRegistrationNumber:registrationnumber});
        const isCorrect=await bcrypt.compare(student.password,password);
        if(!isCorrect)
        {
            return res.status(400).json({message:"password incorrect"});
        }
        
    }catch{
         console.log("error");
    }
}
updateProfile:async(req,res,next)=>{
    try{

    }catch(e){

    }
}
updatePassword:async(req,res,next)=>{
    try{

    }catch{

    }
}
forgetPassword:async(req,res,next)=>{
    try{

    }catch{

    }
}

