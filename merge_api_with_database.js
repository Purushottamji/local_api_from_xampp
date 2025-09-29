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

app.get("/users/:id",(userRequest,userResponse)=>{
    const id=userRequest.params.id;
    const mysql="SELECT * FROM student WHERE id = ?";
    db.query(mysql,[id],(error,result)=>{
        if(error) return userResponse.status(500).json({"message":"server error","data":[]});
        if(result.length === 0) return userResponse.status(404).json({"message":"user not found","data":[]});
         userResponse.status(200).json({"message":"user data fetched","data":result[0]});
    })
})

app.post("/create_user",(userRequest,userResponse)=>{
    const mysqlCreate="INSERT INTO student (name, email, mobile) VALUES ( ?, ?, ?)";
    const {name,email,mobile}=userRequest.body;
    db.query(mysqlCreate,[name, email, mobile],(error,result)=>{
        if(error) return userResponse.status(500).json({"message":"server error","data":[]});
        userResponse.status(201).json({"message":"user created successful","userId":result.insertId});
    })
})

app.patch("/patch_user/:id",(userRequest,userResponse)=>{
    const mysqlPatch="UPDATE student SET name = ? WHERE id = ?";
    const id=userRequest.params.id;
    const name=userRequest.body.name;
    db.query(mysqlPatch,[name,id],(error,result)=>{
        if(error) return userResponse.status(500).json({"message":"server error","data":[]});
        if(result.affectedRows===0) return userResponse.status(404).json({"message":"user not found","data":[]});
        userResponse.status(200).json({"message":"user data updated","data":{id,name}});
    })
})

app.listen(5213,(error)=>{
    if(error) return console.log("error:-" + error.message);
    console.log("Purushottam Kumar");
});