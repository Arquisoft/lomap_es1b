import React, { useState } from 'react';
import AddFriendForm from './AddFriendForm';

interface Friend {
  id: number;
  name: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'Juan' },
    { id: 2, name: 'Pedro' },
    { id: 3, name: 'María' }
  ]);

  const handleAddFriend = (name: string) => {
    const newFriend: Friend = {
      id: friends.length + 1,
      name
    };
    setFriends([...friends, newFriend]);
  };

  const handleRemoveFriend = (id: number) => {
    const filteredFriends = friends.filter(friend => friend.id !== id);
    setFriends(filteredFriends);
  };

  return (
    <div>
      <h2>Lista de amigos</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.name}{' '}
            <button onClick={() => handleRemoveFriend(friend.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <AddFriendForm onAddFriend={handleAddFriend} />
    </div>
  );
};

export default FriendsList;
