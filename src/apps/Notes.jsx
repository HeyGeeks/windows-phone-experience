import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import './Notes.css';

export function Notes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('notes');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Welcome', content: 'Tap + to create a new note', date: new Date().toISOString() },
        ];
    });
    const [selectedNote, setSelectedNote] = useState(null);
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            date: new Date().toISOString()
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setEditContent('');
    };

    const saveNote = () => {
        if (!selectedNote) return;

        const lines = editContent.split('\n');
        const title = lines[0] || 'Untitled';

        setNotes(notes.map(n =>
            n.id === selectedNote.id
                ? { ...n, title, content: editContent, date: new Date().toISOString() }
                : n
        ));
        setSelectedNote(null);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNote?.id === id) {
            setSelectedNote(null);
        }
    };

    if (selectedNote) {
        return (
            <AppShell title="OneNote">
                <div className="note-editor">
                    <textarea
                        className="note-textarea"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Start typing..."
                        autoFocus
                    />
                    <div className="note-actions">
                        <button className="note-btn save" onClick={saveNote}>Save</button>
                        <button className="note-btn cancel" onClick={() => setSelectedNote(null)}>Cancel</button>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="notes">
            <div className="notes-container">
                <button className="add-note-btn" onClick={createNote}>+ New note</button>

                <div className="notes-list">
                    {notes.map(note => (
                        <div
                            key={note.id}
                            className="note-item"
                            onClick={() => {
                                setSelectedNote(note);
                                setEditContent(note.content);
                            }}
                        >
                            <div className="note-info">
                                <span className="note-title">{note.title}</span>
                                <span className="note-date">
                                    {new Date(note.date).toLocaleDateString()}
                                </span>
                            </div>
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
