
import React, { useState } from 'react';

interface UserNameInputProps {
  onSave: (username: string) => void;
  initialName?: string;
}

const UserNameInput: React.FC<UserNameInputProps> = ({ onSave, initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(!initialName);

  const handleSave = () => {
    const trimmedName = name.trim();
    onSave(trimmedName || 'Rando');
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2 text-sm text-blurt-secondary">
        <span>Blurting as:</span>
        <span 
          className="font-medium text-blurt-primary cursor-pointer hover:underline"
          onClick={() => setEditing(true)}
        >
          {name || 'Rando'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="blurt-input text-sm py-1 px-3"
        maxLength={20}
        autoFocus
      />
      <button 
        className="blurt-button py-1 px-3"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default UserNameInput;
