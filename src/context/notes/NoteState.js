import React, { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";
// Yeah NoteState is note ki saari states ko provide karegi
const NoteState = (props) => {
  const host ="http://localhost:5000"
  const notesInitial = []
  // get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOTRiMmM1NTNiN2M1ODUzZTIxMjhiIn0sImlhdCI6MTY3ODM1MjM0N30.L0NZawE5gMO-wMQQNxX1gagEzvoz1Bp3ExtA7qQctq8"
      },
       // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)
    
    setNotes(json)
  }
  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOTRiMmM1NTNiN2M1ODUzZTIxMjhiIn0sImlhdCI6MTY3ODM1MjM0N30.L0NZawE5gMO-wMQQNxX1gagEzvoz1Bp3ExtA7qQctq8"
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json();

    console.log("Adding a new note")
    let note = {
      "_id": "6409c2e714263b7c76490537ac",
      "user": "64094b2c553b7c5853e2128b",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-09T11:28:39.267Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a Note
  
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOTRiMmM1NTNiN2M1ODUzZTIxMjhiIn0sImlhdCI6MTY3ODM1MjM0N30.L0NZawE5gMO-wMQQNxX1gagEzvoz1Bp3ExtA7qQctq8"
      },
      
    });
    const json = response.json();
    console.log(json)
    console.log("Deleting the note with id" + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {

    // API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOTRiMmM1NTNiN2M1ODUzZTIxMjhiIn0sImlhdCI6MTY3ODM1MjM0N30.L0NZawE5gMO-wMQQNxX1gagEzvoz1Bp3ExtA7qQctq8"
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json();

    // Logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState

