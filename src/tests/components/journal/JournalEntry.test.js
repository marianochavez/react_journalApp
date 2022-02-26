import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 213,
    title: "Some awesome title",
    body: "What happened today",
    url: 'https://www.google.com'
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note}/>
  </Provider>
);

describe('JournalEntry tests', () => { 
    
    test('should show correctly', () => { 
        expect(wrapper).toMatchSnapshot();
     });

     test('should active note', () => { 
         wrapper.find('.journal__entry').prop('onClick')();
         expect(store.dispatch).toHaveBeenCalledWith(
             activeNote(note.id, {...note})
         )
      })
 })