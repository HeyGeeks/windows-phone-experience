import { useState } from 'react';
import { Icon } from '../../components/Icons';
import { CHATS, CALLS, CHAT_MESSAGES } from './data';
import { ChatList } from './components/ChatList';
import { ChatDetail } from './components/ChatDetail';
import { CallList } from './components/CallList';
import { CallScreen } from './components/CallScreen';
import './WhatsApp.css';

export function WhatsApp() {
    const [pivot, setPivot] = useState('chats');
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState(CHAT_MESSAGES);
    const [inCall, setInCall] = useState(null);

    const sendMessage = (text) => {
        if (!activeChat) return;
        const newMsg = {
            id: Date.now(),
            text,
            sender: 'me',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: 'sent'
        };
        setMessages(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
        }));
    };

    const startCall = (chat) => {
        setInCall(chat);
    };

    const handleMessageFromCall = (chat) => {
        setActiveChat(chat);
        setInCall(null);
    };

    const favorites = CHATS.filter(c => c.isFavorite);

    // Call Screen
    if (inCall) {
        return (
            <CallScreen
                chat={inCall}
                onEndCall={() => setInCall(null)}
                onMessage={handleMessageFromCall}
            />
        );
    }

    // Chat View
    if (activeChat) {
        return (
            <ChatDetail
                chat={activeChat}
                messages={messages[activeChat.id]}
                onBack={() => setActiveChat(null)}
                onVerifyCall={() => startCall(activeChat)}
                onSendMessage={sendMessage}
            />
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
                <ChatList chats={CHATS} onChatSelect={setActiveChat} />
            )}

            {pivot === 'calls' && (
                <CallList calls={CALLS} onCallSelect={startCall} />
            )}

            {pivot === 'favorites' && (
                favorites.length > 0 ? (
                    <ChatList chats={favorites} onChatSelect={setActiveChat} />
                ) : (
                    <div className="wa-favorites">
                        <p className="wa-empty">No favorites yet. Star conversations to add them here.</p>
                    </div>
                )
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
