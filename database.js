const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",user:"root",database:"details",password:""
});

db.connect((error)=>{
    if(error) return console.log("Error message :-" + error.message);
    console.log("👍 database connected");
})

module.exports=db;
