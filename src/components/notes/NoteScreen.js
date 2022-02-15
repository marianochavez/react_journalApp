import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { title, body, id } = formValues;

  const activeId = useRef(note.id);

  // cambia la nota si el id es diferente, otra nota seleccionada
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          name="title"
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="note" />
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};
