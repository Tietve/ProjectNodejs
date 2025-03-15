import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, sendMessage }) => {
    return (
        <div className="message-input">
            <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;