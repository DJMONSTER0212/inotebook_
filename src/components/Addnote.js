import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from "../context/notes/NoteContext"
const Addnote = () => {
    const context = useContext(noteContext)
  const {addNote } = context;

  const [note,setNote] = useState({title:"",description:"",tag:""})
  const handleClick = (e)=>{
    e.preventDefault()
    addNote(note);
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
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>

        </div>
    )
}

export default Addnote
