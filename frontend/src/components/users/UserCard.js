import React from 'react';
import Button from '../common/Button';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete, canEdit, canDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <p className="user-date">
          Joined {formatDate(user.created_at)}
        </p>
      </div>

      <div className="user-actions">
        {canEdit && (
          <Button
            variant="outline"
            size="small"
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>
        )}
        {canDelete && (
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(user)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;