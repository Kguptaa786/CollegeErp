const express =require('express');
require('./connection/connection');
const Admin=require('./models/admin');
const Faculty=require('./models/faculty');
// const Student=require('./models/student');
const app=express();

const port=process.env.PORT||4000;


app.get('/',(req,res)=>{
    res.send('server started');
});


app.listen(port,()=>{
    console.log(`connection at ${port}`);
});