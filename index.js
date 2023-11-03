const express = require('express')
const post = 8000

const app=express();
// giúp lấy ra dữ liệu khi có yêu cầu POST
const bodyParser=require('body-parser');
//
require('./db');
require('./models/User');
//
const authRouter=require('./routes/authRoutes');
// use bodyParser
app.use(bodyParser.json());
app.use(authRouter);
//


app.get('/',(req,res)=>{
    res.send("This is home page");
})

app.listen(post,()=>{
    console.log(`Server is running on post ${post}`);
})