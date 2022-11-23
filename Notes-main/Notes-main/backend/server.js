const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const cors = require('cors');
const Notes = require('./models.js');
const mongoose = require('mongoose');
const url = `mongodb+srv://Rogustriker:a0ayciEWyq8Uuqr5@notes.3pft3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser:true},()=>{
    console.log("connected...")
})
app.use(express.json())
app.use(cors())
app.get('/DeleteAll',(req,res)=>{
    Notes.deleteMany({},(error,result)=>{
        if(error){
            console.log(error)
            res.status(400).send("<h2>No Notes</h2>")
        }
        else{
            if(result){
                res.status(200).send("<h2>All are deleted</h2>")
            }
        }
    })
})
app.post('/Notes',(req,res)=>{
    const userID = req.body.u_id;
    console.log(userID);
     Notes.find({u_id: userID},(error,result)=>{
         if(error){
             res.status(404).send("<h1>Not found</>")
         }
         else{
             if(result){
                console.log(result);
                res.status(200).json(result)
                console.log(result)
             }
             else{
                 res.status(404).send("No Data")
             }
         }

     })
})
app.post("/Add", (req, res)=>{
    const uId = req.body.u_id;
    const notes = req.body.content;
    Notes.findOne({u_id:uId, content:notes}, (error,result)=>{
            if(error){
                console.log(error);
            }
            else{
                if(result){
                    res.sendStatus(201);
                }
                else{
                    const newNotes = new Notes({
                        u_id : uId,
                        content : notes
                    })
                    try{
                        newNotes.save();
                        res.sendStatus(201);
                    }
                    catch(error){
                        console.log(error)
                        res.status(503)
                    }
                }
            }
    })
})

app.post("/Delete", (req, res)=>{
    const noteId = req.body.noteId;
    Notes.deleteOne({_id:noteId},(error,result)=>{
            if(error){
                console.log(error);
            }
            else{
                if(result){
                    res.sendStatus(200);
                }
                else{
                    res.status(404).send("<h1>Not found</>")
                }
            }
    })
})


app.listen(port,()=>{
     console.log(`Server is listening on port ${port}`)
})
