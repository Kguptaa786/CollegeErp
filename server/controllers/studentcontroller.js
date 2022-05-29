const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  studentLogin: async (req, res) => {
    try {
      const { registrationNumber, password } = req.body;
      if (!registrationNumber || !password) {
        return res.status(400).json({ error: "Please fill all credentials" });
      }
      const student = await Student.findOne({ registrationNumber });

      if (student) {
        const isCorrect = await bcrypt.compareSync(password, student.password);
        if (!isCorrect) {
          return res.status(400).json({ error: "Invalid Credentials" });
        } else {
          const token = await student.generateAuthToken();
          console.log(token);
          // res.status(200).json({ message: "Successfully logged in" });
          // res.cookie("jwttoken", token, {
          //   expires: new Date(Date.now() + 25892000000),
          //   httpOnly: true,
          // });
        }
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  // updateProfile:async(req,res,next)=>{
  //     try{
  //         const{registrationnumber,profilepicture,gender,contactnumber,aadharnumber}=req.data;
  //         const student=await Student.findOne({registrationnumber});
  //         if(gender)
  //         {
  //             student.studentGender=gender;
  //             await student.save();
  //         }
  //         if(contactnumber)
  //         {
  //             student.facultyContactNumber=contactnumber;
  //             await student.save();
  //         }
  //         if(aadharnumber)
  //         {
  //             student.studentAadharNumber=aadharnumber;
  //             await student.save();
  //         }

  //         res.status(200).json({message:"updated successfully"});
  //     }
  //     catch{
  //         console.log("error in updating profile");
  //     }
  // }
  // updatePassword:async(req,res,next)=>{
  //     try{
  //        const {registrationnumber,oldpassword,newpassword,confirmNewPassword}=req.body;
  //        if(!oldpassword||!newpassword||!confirmNewPassword)
  //        {
  //            res.status(400).json({message:"all feild are required"});
  //        }
  //        if(newpassword!==confirmNewPassword)
  //        {
  //            return res.status(400).json({message:"unequal both"})
  //        }
  //        const student=await Student.find({registrationnumber})
  //        const isCorrect=await bcrypt.compare(oldpassword,student.password);
  //        if(!isCorrect)
  //        {
  //            return res.status(400).json({message:"password not matching"})
  //        }
  //        const hashedpassword=await bcrypt.hash(newpassword,10);
  //        student.password=hashedpassword;
  //        await student.save()
  //        res.status(200).json({message:'password updated' });

  //     }catch(e){
  //        console.log("errors in updating password")
  //     }
  // }
  // forgetPassword:async(req,res,next)=>{
  //     try{
  //   const{email}=req.body;
  //   const student=await Student.findOne({email:email});
  //   if(!student)
  //   {
  //       res.status(400).json({message:"email not exist"});
  //   }
  //   function generateOtp(){
  //       var digits='0123456789';
  //       let otp='';
  //       for(let i=0;i<6;i++)
  //       {
  //         otp += digits[Math.floor(Math.random() * 10)];
  //       }
  //   }
  //   const OTP=await generateOtp();
  //   student.otp=OTP;
  //   await student.save();
  //   student.sendEmail(student.email,OTP,"OTP");
  //   res.status(200).json({message:"check your mail box for otp"});
  //   const helper=async()=>{
  //       student.otp="";
  //       await student.save();
  //   }
  //   setTimeout(function(){
  //       helper();

  //   },300000);
  // }catch(e){

  // }
  // }
  // postOTP:async (req,res,next)=>{
  //     try{
  //       const{email,newpassword,confirmNewPassword,OTP}=req.body;
  //       if(newpassword!==confirmNewPassword)
  //       {
  //           return res.status(400).json({message:"password not matching"})
  //       }
  //       const student=await Student.findOne({email:email});
  //       if(OTP!==student.otp)
  //       {
  //       return res.status(400).json({message:"incorrect OTP"});
  //       }
  //       const hashPassword=await bcrypt.hash(newpassword,10);
  //       student.password=hashPassword;
  //       await student.save();
  //       return res.status(200).json({ message: "Password Changed" })
  //     }catch{

  //     }
  // }
  // attendence:async(req,res,next)=>{
  //     try{

  //     }catch(e){

  //     }
  // }
};
