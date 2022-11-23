import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../Styles/Notes.css";
import Axios from "../Axios";
import {response} from './Nav'
import { loginStatus } from "./Nav";
const Notes = () => {
  const [getNotes , setgetNotes] = useState([])
  useEffect(
    () =>{
     if(loginStatus){

      Axios.post("/Notes" ,{ u_id :response.googleId })
        .then((res) => {
          if(res.status===200){
            setgetNotes(res.data)
          }else{
            alert("error")
          }
            
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    []
  );
  const handleDelete = (id)=>{
    Axios.post("/Delete",{
        noteId : id
    })
    .then((res)=>{
        if(res.status === 200){
            setgetNotes(getNotes.filter((note)=> (note._id !== id)));
            alert("Note Deleted");
        }
    })
    .catch((err)=>{
        alert("error")
    })
}
  return (
    <div className="displaynotes">
      <div className="notes-title">
        { loginStatus?
        <h2>Welcome {response.name}! Here's your Notes</h2>:
        <h2 className ="login-msg">Login to See your Notes</h2>
       }   
      </div>
      <div className="note-cards">
        {getNotes.map((note) => {
          return <Card content={note.content} onDelete ={handleDelete}  noteId = {note._id}/>;
        })}
      </div>
    </div>
  );
};

export default Notes;
