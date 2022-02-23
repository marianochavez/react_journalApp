/** * @jest-environment node */
/* 
Se agrego la anterior linea para que funcione el test en el servidor
Error: thrown: "Exceeded timeout of 5000 ms for a test.
        Use jest.setTimeout(newTimeout) to increase the timeout value, 
        if this is a long-running test.
*/
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";

jest.mock("../../helpers/fileUpload", () => {
  return {
    fileUpload: () => {
      return Promise.resolve("https://misfotos.com/photo.png");
    },
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "testing",
  },
  notes: {
    active: {
      id: "2dv28SLctHfd7g5DIwI0",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

describe("notes actions tests", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should create new note - startNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    // delete note
    const noteId = actions[0].payload.id;
    await db.doc(`testing/journal/notes/${noteId}`).delete();
  });

  test("startLoadingNotes should load notes", async () => {
    await store.dispatch(startLoadingNotes("testing"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote should update note", async () => {
    const note = {
      id: "2dv28SLctHfd7g5DIwI0",
      title: "test",
      body: "Updated",
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    // console.log(actions[0].payload.note);

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/testing/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
    expect(docRef.data().body).toBe(note.body);
  });

  test("startUploading should update url entry", async () => {
    const file = [];
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc("testing/journal/notes/2dv28SLctHfd7g5DIwI0")
      .get();
    expect(docRef.data().url).toBe("https://misfotos.com/photo.png");
  });

});
