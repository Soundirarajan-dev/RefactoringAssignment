import React from 'react';
import UserCard from './UserCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './UserList.css';

const UserList = ({ users, loading, onEdit, onDelete, currentUserId }) => {
  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <p>There are no users to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            canEdit={currentUserId === user.id}
            canDelete={currentUserId === user.id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
