// components/NoteList.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import realm from '@/database/realm';

// Function to update a note
const updateNote = (noteId: number, updatedNote: string) => {
  const noteToUpdate = realm.objectForPrimaryKey('Note', noteId);
  if (noteToUpdate) {
    realm.write(() => {
      noteToUpdate.note = updatedNote;
      noteToUpdate.date = new Date().toISOString(); // Update the date as well
    });
    alert('Note updated successfully!');
  } else {
    alert('Note not found!');
  }
};

// Component definition
const NoteList = () => {
  const [notes, setNotes] = useState<any>(realm.objects('Note').sorted('date', true)); // Sorted by date descending
  // const [notes, setNotes] = useState<Realm.Results<Realm.Object>>(realm.objects('Note').sorted('date', true)); 
  const [tempNote, setTempNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = realm.objects('Note').sorted('date', true);
    setNotes(data);   // Correctly using Results object

    const listener = () => {
      setNotes([...data]);   // Spread to convert to an array temporarily
    };

    data.addListener(listener);

    return () => {
      data.removeListener(listener);
    };
  }, []);

  // Save a new note to the database
  const saveNote = (newNote: string) => {
    if (newNote !== '') {
      realm.write(() => {
        realm.create('Note', {
          id: Math.floor(Math.random() * 1000000), // Generate a unique ID
          note: newNote,
          date: new Date().toISOString()
        });
      });
      Alert.alert('Successfully saved your note!');
      setTempNote(''); // Clear the input field after saving
    } else {
      Alert.alert('Empty note!');
    }
  };

  // Delete a note from the database
  const deleteNote = (noteId: number) => {
    const noteToDelete = realm.objectForPrimaryKey('Note', noteId);
    if (noteToDelete) {
      realm.write(() => {
        realm.delete(noteToDelete);
      });
      alert('Note deleted successfully!');
    } else {
      alert('Note not found!');
    }
  };

  // Filter notes based on search query
  const filteredNotes = searchQuery
    ? notes.filtered(`note CONTAINS[c] "${searchQuery}"`)
    : notes;

  // Render each note item
  const renderItem = ({ item }: { item: any }) => (
    <View style={{ marginVertical: 8, padding: 16, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.note}</Text>
      <Text style={{ fontSize: 12, color: '#888' }}>{item.date}</Text>
      <TouchableOpacity onPress={() => deleteNote(item.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateNote(item.id, 'Updated Note Content')}>
        <Text style={{ color: 'blue' }}>Update</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Type your note here..."
        value={tempNote}
        onChangeText={(text) => setTempNote(text)}
      />
      <TouchableOpacity onPress={() => saveNote(tempNote)} style={{ marginBottom: 16 }}>
        <Text style={{ backgroundColor: '#007bff', color: 'white', padding: 8 }}>Save Note</Text>
      </TouchableOpacity>
      <TextInput
        style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', margin: 8 }}>
            <Text>No items.</Text>
          </View>
        }
      />
    </View>
  );
};

export default NoteList;