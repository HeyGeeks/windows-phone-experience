import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Messages.css';

const CONVERSATIONS = [
    { id: 1, name: 'Microsoft', message: 'Welcome to your new Windows Phone!', time: '10:00 AM', unread: true },
    { id: 2, name: 'Cortana', message: 'I can help you organized.', time: 'Yesterday', unread: false },
    { id: 3, name: 'Mom', message: 'Call me when you can.', time: 'Mon', unread: false },
];

export function Messages() {
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState({}); // Map conversation ID to extra messages
    const [inputText, setInputText] = useState('');

    const openChat = (conv) => {
        setActiveChat(conv);
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMsg = { text: inputText, sender: 'me', time: 'Now' };
        setMessages(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
        }));
        setInputText('');
    };

    if (activeChat) {
        return (
            <div className="chat-view">
                <div className="chat-header">
                    <button className="chat-back" onClick={() => setActiveChat(null)}>
                        <Icon name="back" size={20} />
                    </button>
                    <span className="chat-contact">{activeChat.name}</span>
                </div>
                <div className="chat-messages">
                    <div className="message received">
                        <div className="bubble">{activeChat.message}</div>
                        <span className="msg-time">{activeChat.time}</span>
                    </div>
                    {messages[activeChat.id]?.map((msg, i) => (
                        <div key={i} className="message sent">
                            <div className="bubble">{msg.text}</div>
                            <span className="msg-time">{msg.time}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button className="send-btn" onClick={sendMessage}>
                        <Icon name="message" size={20} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="Messaging">
            <div className="messages-list">
                {CONVERSATIONS.map(conv => (
                    <div key={conv.id} className="thread-item" onClick={() => openChat(conv)}>
                        <div className={`thread-status ${conv.unread ? 'unread' : ''}`} />
                        <div className="thread-content">
                            <div className="thread-header">
                                <span className="thread-name">{conv.name}</span>
                                <span className="thread-time">{conv.time}</span>
                            </div>
                            <span className="thread-preview">{conv.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </AppShell>
    );
}
