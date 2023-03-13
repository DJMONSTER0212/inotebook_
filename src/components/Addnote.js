import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from "../context/notes/NoteContext"
const Addnote = () => {
    const context = useContext(noteContext)
  const {addNote } = context;

  const [note,setNote] = useState({title:"",description:"",tag:"default"})
  const handleClick = (e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag);
  }
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value}) // jo bhi value is note object k ander hai woh rahe lekin jo properties yaha aage likhi jaa rhi hai inko add ya overwrite kar de
  }
    return (
        <div className="container">
            <h1>Add A Note ✍</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" onChange={onChange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default Addnote
