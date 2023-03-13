import React, { useContext, useEffect, useRef,useState } from 'react'  // useRef se aap kisi bhi ek element ko reference de sakte ho
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote'
function Notes() {
  const context = useContext(noteContext)
  const [note,setNote] = useState({etitle:"",edescription:"",etag:""})
  const { notes, getNotes } = context;
  const ref = useRef(null)
  useEffect(() => {
    // eslint-disable-next-line
    getNotes();
  }, [])

  const handleClick = (e)=>{
    console.log("updating note",note);
    e.preventDefault()
    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value}) // jo bhi value is note object k ander hai woh rahe lekin jo properties yaha aage likhi jaa rhi hai inko add ya overwrite kar de
  }

  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  return (
    <>
      <Addnote />
      <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row my-3">
          <h1>Your Notes</h1>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
