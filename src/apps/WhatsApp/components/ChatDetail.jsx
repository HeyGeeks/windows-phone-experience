import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../../../components/Icons';

export function ChatDetail({ chat, messages, onBack, onVerifyCall, onSendMessage }) {
    const [inputText, setInputText] = useState('');
    const [showAttach, setShowAttach] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        onSendMessage(inputText);
        setInputText('');
    };

    return (
        <div className="wa-chat">
            <div className="wa-chat-header">
                <button className="wa-back" onClick={onBack}>
                    <Icon name="back" size={20} />
                </button>
                <div className="wa-chat-info" onClick={onVerifyCall}>
                    {chat.photo ? (
                        <img src={chat.photo} alt="" className="wa-chat-avatar" />
                    ) : (
                        <div className="wa-chat-avatar-placeholder">
                            <Icon name={chat.isGroup ? 'people' : 'contacts'} size={20} />
                        </div>
                    )}
                    <span className="wa-chat-title">{chat.name}</span>
                </div>
                <button className="wa-call-btn" onClick={onVerifyCall}>
                    <Icon name="phone" size={20} />
                </button>
            </div>
            <div className="wa-messages">
                {(messages || []).map(msg => (
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
                <div ref={messagesEndRef} />
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="wa-send" onClick={handleSend}>
                    <Icon name="forward" size={20} />
                </button>
            </div>
        </div>
    );
}
