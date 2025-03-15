import React from 'react';

const RoomList = ({ chatRooms, setSelectedRoomId, createChatRoom, deleteChatRoom }) => {
    return (
        <>
            <h2>Chat Rooms</h2>
            <button onClick={createChatRoom}>Create Room</button>
            <ul className="room-list">
                {chatRooms.map(room => (
                    <li key={room.id}>
            <span onClick={() => setSelectedRoomId(room.id)}>
              {room.room_name}
            </span>
                        <button onClick={() => deleteChatRoom(room.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default RoomList;