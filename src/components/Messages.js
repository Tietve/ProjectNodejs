import React from 'react';

const Messages = ({ messages }) => {
    return (
        <div className="messages">
            {messages.map(msg => (
                <div key={msg.id} className="message">
                    <strong>{msg.username}</strong> [{new Date(msg.created_at).toLocaleTimeString()}]: {msg.message}
                </div>
            ))}
        </div>
    );
};

export default Messages;