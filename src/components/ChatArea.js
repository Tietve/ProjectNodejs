import React from 'react';
import Members from './Members';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatArea = ({
                      selectedRoom,
                      users,
                      messages,
                      newMessage,
                      setNewMessage,
                      sendMessage,
                      addUserToRoom,
                      removeUserFromRoom
                  }) => {
    return (
        <div className="chat-area">
            {selectedRoom ? (
                <>
                    <h2>{selectedRoom.room_name}</h2>
                    <Members
                        selectedRoom={selectedRoom}
                        users={users}
                        addUserToRoom={addUserToRoom}
                        removeUserFromRoom={removeUserFromRoom}
                    />
                    <Messages messages={messages} />
                    <MessageInput
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        sendMessage={sendMessage}
                    />
                </>
            ) : (
                <div className="no-room">Select a room to start chatting</div>
            )}
        </div>
    );
};

export default ChatArea;