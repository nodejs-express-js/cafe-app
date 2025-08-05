const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors")
const userRouter=require("./Routers/UserRouter")

app.use(cors());
app.use(express.json());
app.use("/v1/user",userRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});