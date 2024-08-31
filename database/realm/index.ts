// store/realm/index.js
import Realm from 'realm';
import { NoteSchema } from './NoteSchema';

const realm = new Realm({
  schema: [NoteSchema], // You can add more schemas here if needed
});

export default realm;