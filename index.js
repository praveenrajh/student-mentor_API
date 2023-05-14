const express = require("express");
const app = express();
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin : "*"
}))
const dotenv = require("dotenv").config();
const URL = process.env.DB;

app.get("/", (req, res) =>
  res.send(`Server Running`)
);

app.post("/addteacher",async function(req,res){
    try{

    const connection = await mongoClient.connect(URL);

    const db = connection.db("studentteacher") ;

    const addteacher = await db.collection("teachers").insertOne(req.body);

    await connection.close();

    res.json({
       message : "Teacher added successfully"
    })
}
catch(error){
    console.log(error);
}

})

app.put("/editteacher/:id",async function(req,res){
    try{
        const connection = await mongoClient.connect(URL);
        const db = connection.db("studentteacher") ;
       const edit= await db.collection("teachers").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
       await connection.close();
       res.json({
        message:"Successfully updated"
       })
    }
    catch(error){
console.log(error);
    }
})

app.delete("/deleteteacher/:id",async function(req,res){
  
    const connection = await mongoClient.connect(URL);
    const db = connection.db("studentteacher") ;
    const deleteteacher = await db.collection("teachers").deleteOne({_id:mongodb.ObjectId(req.params.id)});
    await connection.close();
    res.json({
        message : "Teacher deleted"
    })


})

app.get("/displayteachers",async function(req,res){
     try{
    const connection = await mongoClient.connect(URL);
    const db = connection.db("studentteacher") ;
    const findteachers = await db.collection("teachers").find().toArray();
    await connection.close();
    res.json(findteachers);
}
    catch(error){
        console.log(error);
    }
})



app.get("/displayteachers/:id",async function(req,res){
    try{
   const connection = await mongoClient.connect(URL);
   const db = connection.db("studentteacher") ;
   const findteachers = await db.collection("teachers").findOne({_id:mongodb.ObjectId(req.params.id)});
   await connection.close();
   res.json(findteachers);
}
   catch(error){
       console.log(error);
   }
})


app.post("/addstudent",async function(req,res){
    try{

    const connection = await mongoClient.connect(URL);

    const db = connection.db("studentteacher") ;

    const addstudent = await db.collection("students").insertOne(req.body);

    await connection.close();

    res.json({
       message : "Student added successfully"
    })
}
catch(error){
    console.log(error);
}




})

app.delete("/deletestudent/:id",async function(req,res){
    try{
      const connection = await mongoClient.connect(URL);
      const db = connection.db("studentteacher") ;
      const deletestudent= await db.collection("students").deleteOne({_id:mongodb.ObjectId(req.params.id)});
      await connection.close();
      res.json({
          message : "student deleted"
      })
  }
  catch(error){
      console.log(error);
  }
  
  
  })

  app.get("/displaystudents",async function(req,res){
    try{
   const connection = await mongoClient.connect(URL);
   const db = connection.db("studentteacher") ;
   const findstudents = await db.collection("students").find().toArray();
   await connection.close();
   res.json(findstudents);
}
   catch(error){
       console.log(error);
   }
})


app.put("/teacherstudent/:id",async function(req,res){

    try{
        const connection = await mongoClient.connect(URL);
        const db = connection.db("studentteacher") ;
        const update = await db.collection("teachers").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        await connection.close();
        res.json({
            message : "Student assigned"
        })

    }
    catch(error){
        console.log(error);
    }
})

app.put("/isable/:id",async function(req,res){
    const connection = await mongoClient.connect(URL);
    const db = connection.db("studentteacher");
    const updateisable = await db.collection("students").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
    await connection.close();
})

app.put("changementor/:studentid",async function(req,res){  //req should contain key 'idcurrent' which carries the current teacher id and idnew in new teacher id
    const connection = await mongoClient.connect(URL);
    const db = connection.db("studentteacher");
    const find = await db.collection("teachers").updateOne({_id:mongodb.ObjectId(req.body.idcurrent)},{$pull:{students:req.params.studentid}})
    const changeisablefalse = await db.collection("students").updateOne({_id:studentid},{$set:{isabled:false}}); 
    const addstudent = await db.collection("teachers").updateOne({_id:mongodb.ObjectId(req.body.idnew)},{$push:{students:req.params.studentid}})
    await connection.close();
    res.json({
        message : "Successfully Changed"
    })
})

app.listen(process.env.PORT || 3000);