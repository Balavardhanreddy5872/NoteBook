import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

// Update Note 
const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editnote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({ id: '', edittitle: "", editdescription: "", edittag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag });
    }
    const handleclick = () => {
        console.log("updating the note", note)
        editnote(note.id, note.edittitle, note.editdescription, note.edittag)
        ref2.current.click()
        window.location.reload()
    }


    const ref = useRef(null)
    const ref2 = useRef(null)
    return (
        <div className="row my-3">

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ visibility: "hidden" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" name='edittitle' value={note.edittitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editdescription" name='editdescription' value={note.editdescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edittag" name='edittag' value={note.edittag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edittitle.length < 5 || note.editdescription.length < 5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className="container mx-2 my-3">
                <b>{notes.length === 0 && 'No Notes to dispaly'}</b>
            </div>
            {notes.map((note) => {
                return <Noteitem note={note} key={note._id} updateNote={updateNote} />
            })}
        </div>
    )
}

export default Notes