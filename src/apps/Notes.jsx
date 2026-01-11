import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Notes.css';

export function Notes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('wp_notes');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'welcome to onenote', content: 'tap + to create a new note', date: new Date().toISOString(), color: '#5C2D91' },
            { id: 2, title: 'shopping list', content: 'milk, bread, eggs, butter', date: new Date().toISOString(), color: '#0078D7' },
        ];
    });
    const [selectedNote, setSelectedNote] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('wp_notes', JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const colors = ['#5C2D91', '#0078D7', '#107C10', '#D83B01', '#E81123'];
        const newNote = {
            id: Date.now(),
            title: 'new note',
            content: '',
            date: new Date().toISOString(),
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setEditTitle('new note');
        setEditContent('');
    };

    const saveNote = () => {
        if (!selectedNote) return;
        setNotes(notes.map(n =>
            n.id === selectedNote.id
                ? { ...n, title: editTitle || 'untitled', content: editContent, date: new Date().toISOString() }
                : n
        ));
        setSelectedNote(null);
    };

    const deleteNote = (id, e) => {
        e.stopPropagation();
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNote?.id === id) setSelectedNote(null);
    };

    if (selectedNote) {
        return (
            <AppShell title="onenote" hideTitle>
                <div className="wp-note-editor">
                    <div className="wp-note-editor-header">
                        <button className="wp-back-btn" onClick={saveNote}><Icon name="back" size={20} /></button>
                        <input
                            type="text"
                            className="wp-note-title-input"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="title"
                        />
                    </div>
                    <textarea
                        className="wp-note-textarea"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="start typing..."
                        autoFocus
                    />
                    <div className="wp-note-bar">
                        <button onClick={saveNote}><Icon name="bookmark" size={24} /></button>
                        <button><Icon name="share" size={24} /></button>
                        <button onClick={() => deleteNote(selectedNote.id, { stopPropagation: () => {} })}><Icon name="delete" size={24} /></button>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="onenote" hideTitle>
            <div className="wp-notes">
                <h1 className="wp-notes-title">OneNote</h1>
                <div className="wp-notes-grid">
                    <div className="wp-note-card wp-add-note" onClick={createNote}>
                        <Icon name="add" size={32} />
                        <span>new note</span>
                    </div>
                    {notes.map(note => (
                        <div
                            key={note.id}
                            className="wp-note-card"
                            style={{ background: note.color }}
                            onClick={() => {
                                setSelectedNote(note);
                                setEditTitle(note.title);
                                setEditContent(note.content);
                            }}
                        >
                            <span className="wp-note-card-title">{note.title}</span>
                            <span className="wp-note-card-preview">{note.content.substring(0, 50)}</span>
                            <span className="wp-note-card-date">{new Date(note.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
