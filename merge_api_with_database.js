const express=require("express");
const app=express();
const db=require("./database");
app.use(express.json());

app.get("/users",(userRequest,userResponse)=>{
    const mysql="SELECT * FROM student";
    db.query(mysql,(error,result)=>{
        if(error) return userResponse.status(500).json({"message":"server error","data":[]});
        userResponse.status(200).json({"message":"user data fetched","data":result});
    });
})




app.listen(5213,(error)=>{
    if(error) return console.log("error:-" + error.message);
    console.log("Purushottam Kumar");
})