// store/realm/NoteSchema.js
export const NoteSchema = {
  name: 'Note',
  properties: {
    id: 'int',
    note: 'string',
    date: 'string'  // Add date property for sorting and filtering
  },
  primaryKey: 'id',
};