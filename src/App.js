// src/App.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from './api/api';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './App.css';

const socket = io('http://localhost:5000', { autoConnect: false });

function App() {
    const [users, setUsers] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUserId] = useState(1);

    const selectedRoom = chatRooms.find(room => room.id === selectedRoomId) || null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, roomsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/rooms')
                ]);
                setUsers(usersRes.data);
                setChatRooms(roomsRes.data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        socket.connect();
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (selectedRoomId) {
            const fetchRoomData = async () => {
                try {
                    const [messagesRes, membersRes] = await Promise.all([
                        api.get(`/messages/${selectedRoomId}`),
                        api.get(`/members/${selectedRoomId}`)
                    ]);
                    setMessages(messagesRes.data);
                    setChatRooms(prev => prev.map(room =>
                        room.id === selectedRoomId
                            ? { ...room, members: membersRes.data.map(m => m.id) }
                            : room
                    ));
                    socket.emit('joinRoom', selectedRoomId.toString());
                } catch (error) {
                    console.error('Error fetching room data:', error);
                }
            };
            fetchRoomData();
        }
    }, [selectedRoomId]);

    const createChatRoom = async () => {
        const roomName = prompt('Enter room name:');
        if (roomName) {
            try {
                const res = await api.post('/rooms', {
                    room_name: roomName,
                    created_by: currentUserId
                });
                setChatRooms(prev => [...prev, res.data]);
            } catch (error) {
                console.error('Error creating room:', error);
            }
        }
    };

    const deleteChatRoom = async (roomId) => {
        try {
            await api.delete(`/rooms/${roomId}`);
            setChatRooms(prev => prev.filter(room => room.id !== roomId));
            if (selectedRoomId === roomId) setSelectedRoomId(null);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    const addUserToRoom = async (roomId, userId) => {
        try {
            await api.post('/members', { room_id: roomId, user_id: userId });
            const membersRes = await api.get(`/members/${roomId}`);
            setChatRooms(prev => prev.map(room =>
                room.id === roomId
                    ? { ...room, members: membersRes.data.map(m => m.id) }
                    : room
            ));
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const removeUserFromRoom = async (roomId, userId) => {
        try {
            await api.delete('/members', { data: { room_id: roomId, user_id: userId } });
            const membersRes = await api.get(`/members/${roomId}`);
            setChatRooms(prev => prev.map(room =>
                room.id === roomId
                    ? { ...room, members: membersRes.data.map(m => m.id) }
                    : room
            ));
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

    const sendMessage = async () => {
        if (newMessage && selectedRoom) {
            const messageData = {
                user_id: currentUserId,
                room_id: selectedRoom.id,
                message: newMessage
            };

            try {
                const res = await api.post('/messages', messageData);
                socket.emit('sendMessage', res.data); // Gửi tin nhắn đã lưu lên WebSocket
                setMessages(prev => [...prev, res.data]);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    return (
        <div className="app">
            <Sidebar
                users={users}
                chatRooms={chatRooms}
                setSelectedRoomId={setSelectedRoomId}
                createChatRoom={createChatRoom}
                deleteChatRoom={deleteChatRoom}
            />
            <ChatArea
                selectedRoom={selectedRoom}
                users={users}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                sendMessage={sendMessage}
                addUserToRoom={addUserToRoom}
                removeUserFromRoom={removeUserFromRoom}
            />
        </div>
    );
}

export default App;