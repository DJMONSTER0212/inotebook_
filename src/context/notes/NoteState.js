import React, { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";
// Yeah NoteState is note ki saari states ko provide karegi
const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "6409c2e71463b7c7649057ac",
            "user": "64094b2c553b7c5853e2128b",
            "title": "My title",
            "description": "this is the description of first trial",
            "tag": "personal",
            "date": "2023-03-09T11:28:39.267Z",
            "__v": 0
          }
    ]
    const [notes,setNotes] = useState(notesInitial)
    return (
       <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState