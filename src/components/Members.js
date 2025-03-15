import React from 'react';

const Members = ({ selectedRoom, users, addUserToRoom, removeUserFromRoom }) => {
    return (
        <div className="room-members">
            <h3>Members:</h3>
            {users.map(user => (
                <div key={user.id} className="member-item">
                    <span>{user.username}</span>
                    {selectedRoom.members && selectedRoom.members.includes(user.id) ? (
                        <button onClick={() => removeUserFromRoom(selectedRoom.id, user.id)}>
                            Remove
                        </button>
                    ) : (
                        <button onClick={() => addUserToRoom(selectedRoom.id, user.id)}>
                            Add
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Members;