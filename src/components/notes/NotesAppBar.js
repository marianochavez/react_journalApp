import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );
  const noteDate = moment(active.date);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = (e.target.files[0]);
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return <div className='notes__appbar'>
      <span>{noteDate.format("LL")}</span>

      <input
        id='fileSelector'
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div>
          <button className='btn' onClick={handlePictureUpload}>
            Picture
          </button>
          <button className='btn' onClick={handleSave}>
            Save
          </button>
      </div>
  </div>;
};
