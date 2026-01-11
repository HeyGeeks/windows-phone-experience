import { useState } from 'react';
import { Icon } from '../components/Icons';
import './WhatsApp.css';

const CHATS = [
    { id: 1, name: 'Whitmans Chat', message: 'Ned: Yeah, I think I know what you...', time: '11:45', unread: 0, photo: 'https://i.pravatar.cc/100?img=11', isGroup: true },
    { id: 2, name: 'Stewart Family', message: 'Steve: Great, thanks!', time: '11:39', unread: 1, photo: null, isGroup: true },
    { id: 3, name: 'Alice Whitman', message: 'Image', time: '10:50', unread: 0, photo: 'https://i.pravatar.cc/100?img=5' },
    { id: 4, name: 'Jack Whitman', message: '🎵 0:07', time: '6/30', unread: 0, photo: 'https://i.pravatar.cc/100?img=12' },
    { id: 5, name: 'Lunch Group', message: 'Sounds good!', time: '6/29', unread: 0, photo: null, isGroup: true },
    { id: 6, name: 'Jane Pearson', message: '👋🏻', time: '6/29', unread: 0, photo: 'https://i.pravatar.cc/100?img=9' },
    { id: 7, name: 'Divya Sarin', message: '+1 890 567 1234 joined', time: '6/28', unread: 0, photo: 'https://i.pravatar.cc/100?img=25' },
    { id: 8, name: 'Sai Tambe', message: 'See you tomorrow!', time: '6/28', unread: 0, photo: 'https://i.pravatar.cc/100?img=15' },
];

const CHAT_MESSAGES = {
    3: [
        { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30' },
        { id: 2, text: "I'm good! Just got back from vacation", sender: 'me', time: '10:32' },
        { id: 3, text: 'Nice! 😊', sender: 'them', time: '10:48', status: 'read' },
    ]
};

export function WhatsApp() {
    const [pivot, setPivot] = useState('chats');
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState(CHAT_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [inCall, setInCall] = useState(null);
    const [showAttach, setShowAttach] = useState(false);

    const sendMessage = () => {
        if (!inputText.trim() || !activeChat) return;
        const newMsg = { 
            id: Date.now(), 
            text: inputText, 
            sender: 'me', 
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: 'sent'
        };
        setMessages(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
        }));
        setInputText('');
    };

    const startCall = (chat) => {
        setInCall(chat);
    };

    // Call Screen
    if (inCall) {
        return (
            <div className="wa-call-screen">
                <div className="wa-call-header">
                    <span className="wa-call-icon">📞</span>
                    <span className="wa-call-label">WHATSAPP CALL</span>
                </div>
                <div className="wa-call-content">
                    <span className="wa-call-timer">03:34</span>
                    <div className="wa-call-photo">
                        {inCall.photo ? (
                            <img src={inCall.photo} alt={inCall.name} />
                        ) : (
                            <div className="wa-call-avatar"><Icon name="contacts" size={80} /></div>
                        )}
                    </div>
                    <h2 className="wa-call-name">{inCall.name}</h2>
                    <span className="wa-call-number">+1 555 050 5551</span>
                </div>
                <div className="wa-call-actions">
                    <button className="wa-call-action">
                        <Icon name="volume" size={24} />
                        <span>speaker</span>
                    </button>
                    <button className="wa-call-action">
                        <Icon name="mute" size={24} />
                        <span>mute</span>
                    </button>
                    <button className="wa-call-action">
                        <Icon name="bluetooth" size={24} />
                        <span>Bluetooth</span>
                    </button>
                </div>
                <div className="wa-call-bottom">
                    <button className="wa-end-call" onClick={() => setInCall(null)}>end call</button>
                    <button className="wa-message-btn" onClick={() => { setActiveChat(inCall); setInCall(null); }}>
                        <Icon name="message" size={20} />
                        <span>message</span>
                    </button>
                </div>
            </div>
        );
    }

    // Chat View
    if (activeChat) {
        return (
            <div className="wa-chat">
                <div className="wa-chat-header">
                    <button className="wa-back" onClick={() => setActiveChat(null)}>
                        <Icon name="back" size={20} />
                    </button>
                    <div className="wa-chat-info" onClick={() => startCall(activeChat)}>
                        {activeChat.photo ? (
                            <img src={activeChat.photo} alt="" className="wa-chat-avatar" />
                        ) : (
                            <div className="wa-chat-avatar-placeholder">
                                <Icon name={activeChat.isGroup ? 'people' : 'contacts'} size={20} />
                            </div>
                        )}
                        <span className="wa-chat-title">{activeChat.name}</span>
                    </div>
                    <button className="wa-call-btn" onClick={() => startCall(activeChat)}>
                        <Icon name="phone" size={20} />
                    </button>
                </div>
                <div className="wa-messages">
                    {(messages[activeChat.id] || []).map(msg => (
                        <div key={msg.id} className={`wa-msg ${msg.sender}`}>
                            <div className="wa-bubble">
                                <span className="wa-msg-text">{msg.text}</span>
                                <span className="wa-msg-time">
                                    {msg.time}
                                    {msg.sender === 'me' && <span className="wa-msg-status">✓✓</span>}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {showAttach && (
                    <div className="wa-attach-bar">
                        <span className="wa-attach-label">ATTACH MEDIA</span>
                        <div className="wa-attach-grid">
                            <button className="wa-attach-btn"><Icon name="camera" size={24} /><span>Camera</span></button>
                            <button className="wa-attach-btn"><Icon name="video" size={24} /><span>Camcorder</span></button>
                            <button className="wa-attach-btn"><Icon name="contacts" size={24} /><span>Contact</span></button>
                            <button className="wa-attach-btn"><Icon name="photo" size={24} /><span>Album</span></button>
                            <button className="wa-attach-btn"><Icon name="music" size={24} /><span>Audio</span></button>
                            <button className="wa-attach-btn"><Icon name="map" size={24} /><span>Location</span></button>
                        </div>
                    </div>
                )}
                <div className="wa-input-bar">
                    <button className="wa-attach-toggle" onClick={() => setShowAttach(!showAttach)}>
                        <Icon name="attach" size={20} />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="wa-send" onClick={sendMessage}>
                        <Icon name="forward" size={20} />
                    </button>
                </div>
            </div>
        );
    }

    // Main View
    return (
        <div className="wa-app">
            <div className="wa-header">
                <div className="wa-header-top">
                    <span className="wa-logo">📞</span>
                    <span className="wa-title">WHATSAPP</span>
                    <span className="wa-badge">2</span>
                </div>
                <div className="wa-pivots">
                    <button className={`wa-pivot ${pivot === 'chats' ? 'active' : ''}`} onClick={() => setPivot('chats')}>chats</button>
                    <button className={`wa-pivot ${pivot === 'calls' ? 'active' : ''}`} onClick={() => setPivot('calls')}>calls</button>
                    <button className={`wa-pivot ${pivot === 'favorites' ? 'active' : ''}`} onClick={() => setPivot('favorites')}>favorites</button>
                </div>
            </div>

            {pivot === 'chats' && (
                <div className="wa-chats-list">
                    {CHATS.map(chat => (
                        <div key={chat.id} className="wa-chat-item" onClick={() => setActiveChat(chat)}>
                            <div className="wa-avatar">
                                {chat.photo ? (
                                    <img src={chat.photo} alt="" />
                                ) : (
                                    <div className="wa-avatar-placeholder">
                                        <Icon name={chat.isGroup ? 'people' : 'contacts'} size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="wa-chat-content">
                                <div className="wa-chat-row">
                                    <span className="wa-chat-name">{chat.name}</span>
                                    <span className="wa-chat-time">{chat.time}</span>
                                </div>
                                <span className="wa-chat-preview">{chat.message}</span>
                            </div>
                            {chat.unread > 0 && <span className="wa-unread">{chat.unread}</span>}
                        </div>
                    ))}
                </div>
            )}

            {pivot === 'calls' && (
                <div className="wa-calls-list">
                    <div className="wa-call-item">
                        <div className="wa-avatar"><img src="https://i.pravatar.cc/100?img=5" alt="" /></div>
                        <div className="wa-call-info">
                            <span className="wa-call-contact">Alice Whitman</span>
                            <span className="wa-call-meta">↙ Yesterday, 3:45 PM</span>
                        </div>
                        <button className="wa-call-icon-btn"><Icon name="phone" size={20} /></button>
                    </div>
                    <div className="wa-call-item">
                        <div className="wa-avatar"><img src="https://i.pravatar.cc/100?img=12" alt="" /></div>
                        <div className="wa-call-info">
                            <span className="wa-call-contact">Jack Whitman</span>
                            <span className="wa-call-meta">↗ Monday, 2:30 PM</span>
                        </div>
                        <button className="wa-call-icon-btn"><Icon name="phone" size={20} /></button>
                    </div>
                </div>
            )}

            {pivot === 'favorites' && (
                <div className="wa-favorites">
                    <p className="wa-empty">No favorites yet. Star conversations to add them here.</p>
                </div>
            )}

            <div className="wa-bottom-bar">
                <button className="wa-bottom-btn"><Icon name="search" size={24} /></button>
                <button className="wa-bottom-btn"><Icon name="add" size={24} /></button>
                <button className="wa-bottom-btn"><Icon name="people" size={24} /></button>
                <button className="wa-bottom-btn"><Icon name="more" size={24} /></button>
            </div>
        </div>
    );
}
