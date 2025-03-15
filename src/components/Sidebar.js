import React from 'react';
import UserList from './UserList';
import RoomList from './RoomList';

const Sidebar = ({ users, chatRooms, setSelectedRoomId, createChatRoom, deleteChatRoom }) => {
    return (
        <div className="sidebar">
            <UserList users={users} />
            <RoomList
                chatRooms={chatRooms}
                setSelectedRoomId={setSelectedRoomId}
                createChatRoom={createChatRoom}
                deleteChatRoom={deleteChatRoom}
            />
        </div>
    );
};

export default Sidebar;