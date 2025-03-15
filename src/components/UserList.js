import React from 'react';

const UserList = ({ users }) => {
    return (
        <>
            <h2>Users</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </>
    );
};

export default UserList;