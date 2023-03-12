import React, { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";
// Yeah NoteState is note ki saari states ko provide karegi
const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "6409c2e71463b7c764e9057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },{
            "_id": "6409cd2e71463b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title2",
            "description": "this is the description of 2 trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },{
            "_id": "6409c2eu71463b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title3",
            "description": "this is the description of 3 trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },{
            "_id": "6409c2e714637b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title 4",
            "description": "this is the description of 4 trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },
          {
            "_id": "6409c2e714636b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },
          {
            "_id": "6409c2fe71463b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },{
            "_id": "6409c2e7q1463b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          },{
            "_id": "6409c2e714263b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          }
    ]

    // Add a note
    const addNote = (title ,description,tag)=>{
      // API call
      console.log("Adding a new note")
      let note = {
        "_id": "6409c2e714263b7c76490537ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My ADDED",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
      };
      setNotes(notes.concat(note))
    }
    //Delete a Note
    const deleteNote = ()=>{

    }
    // Edit a note
    const editNote = ()=>{

    }

    const [notes,setNotes] = useState(notesInitial)
    return (
       <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState