import React, { useState } from 'react';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
}

const AddFriendForm: React.FC<AddFriendFormProps> = ({ onAddFriend }) => {
  const [newFriendName, setNewFriendName] = useState('');

  const handleAddFriend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddFriend(newFriendName);
    setNewFriendName('');
  };

  return (
    <form onSubmit={handleAddFriend}>
      <label>
        Agregar amigo:
        <input type="text" value={newFriendName} onChange={event => setNewFriendName(event.target.value)} />
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default AddFriendForm;
