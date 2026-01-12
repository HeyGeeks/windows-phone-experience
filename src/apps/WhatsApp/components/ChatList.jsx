import React from 'react';
import { Icon } from '../../../components/Icons';

export function ChatList({ chats, onChatSelect }) {
    return (
        <div className="wa-chats-list">
            {chats.map(chat => (
                <div key={chat.id} className="wa-chat-item" onClick={() => onChatSelect(chat)}>
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
    );
}
