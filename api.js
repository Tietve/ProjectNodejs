import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat-rooms';

export const createChatRoom = async (name) => {
    return await axios.post(`${API_URL}/create`, { name });
};

export const deleteChatRoom = async (id) => {
    return await axios.delete(`${API_URL}/delete/${id}`);
};

export const addMemberToRoom = async (chatRoomId, employeeId) => {
    return await axios.post(`${API_URL}/add-member`, { chatRoomId, employeeId });
};

export const removeMemberFromRoom = async (chatRoomId, employeeId) => {
    return await axios.delete(`${API_URL}/remove-member`, { data: { chatRoomId, employeeId } });
};
