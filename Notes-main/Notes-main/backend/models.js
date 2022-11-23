// const psd = "a0ayciEWyq8Uuqr5"
// const db  = `mongodb+srv://Rogustriker:a0ayciEWyq8Uuqr5@notes.3pft3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const NotesSchema = new Schema(
     {
        u_id:String,
        content:String,
     }
 )
const Notes = mongoose.model("Notes",NotesSchema);
module.exports = Notes;