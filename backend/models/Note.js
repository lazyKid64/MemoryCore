import mongoose from "mongoose";
//1.Create a schema 
//2.model based of that schema 

const noteSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
    }, {timestamps : true}
);

//model
const Note = mongoose.model("Note", noteSchema);

export default Note;