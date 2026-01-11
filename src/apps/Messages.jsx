import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Messages.css';

const CONVERSATIONS = [
    { id: 1, name: 'Microsoft', message: 'Welcome to your new Windows Phone!', time: '10:00 AM', unread: true, photo: null },
    { id: 2, name: 'Mom', message: 'Call me when you can.', time: 'Yesterday', unread: false, photo: 'https://i.pravatar.cc/100?img=1' },
    { id: 3, name: 'Alex', message: 'See you tomorrow!', time: 'Monday', unread: false, photo: 'https://i.pravatar.cc/100?img=3' },
    { id: 4, name: 'Work Group', message: 'Meeting at 3pm', time: 'Sunday', unread: true, photo: null },
];

export function Messages() {
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        const newMsg = { text: inputText, sender: 'me', time: 'now' };
        setMessages(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
        }));
        setInputText('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    if (activeChat) {
        return (
            <div className="wp-chat">
                <div className="wp-chat-header">
                    <button className="wp-chat-back" onClick={() => setActiveChat(null)}>
                        <Icon name="back" size={20} />
                    </button>
                    {activeChat.photo && <img src={activeChat.photo} alt="" className="wp-chat-avatar" />}
                    <span className="wp-chat-name">{activeChat.name}</span>
                </div>
                <div className="wp-chat-messages">
                    <div className="wp-message received">
                        <div className="wp-bubble">{activeChat.message}</div>
                        <span className="wp-msg-time">{activeChat.time}</span>
                    </div>
                    {messages[activeChat.id]?.map((msg, i) => (
                        <div key={i} className={`wp-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                            <div className="wp-bubble">{msg.text}</div>
                            <span className="wp-msg-time">{msg.time}</span>
                        </div>
                    ))}
                </div>
                <div className="wp-chat-input">
                    <input
                        type="text"
                        placeholder="type a message"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="wp-send-btn" onClick={sendMessage}>
                        <Icon name="forward" size={20} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="messaging" hideTitle>
            <div className="wp-messages">
                <h1 className="wp-messages-title">Messaging</h1>
                <div className="wp-threads-list">
                    {CONVERSATIONS.map(conv => (
                        <div key={conv.id} className="wp-thread-item" onClick={() => setActiveChat(conv)}>
                            <div className="wp-thread-avatar">
                                {conv.photo ? (
                                    <img src={conv.photo} alt="" />
                                ) : (
                                    <div className="wp-avatar-placeholder"><Icon name="contacts" size={24} /></div>
                                )}
                            </div>
                            <div className="wp-thread-content">
                                <div className="wp-thread-header">
                                    <span className={`wp-thread-name ${conv.unread ? 'unread' : ''}`}>{conv.name}</span>
                                    <span className="wp-thread-time">{conv.time}</span>
                                </div>
                                <span className="wp-thread-preview">{conv.message}</span>
                            </div>
                            {conv.unread && <div className="wp-unread-dot" />}
                        </div>
                    ))}
                </div>
                <button className="wp-new-message">
                    <Icon name="add" size={24} />
                </button>
            </div>
        </AppShell>
    );
}
