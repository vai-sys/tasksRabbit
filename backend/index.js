const express=require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT=process.env.PORT

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

const authRoutes=require("./routes/authRoutes.js")
app.use("/api/auth",authRoutes) 

const taskRoutes=require("./routes/authRoutes.js");
app.use("/api/tasks",taskRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`server is listening on PORT ${PORT}`)
})