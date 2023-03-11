import Button from '@mui/material/Button/Button';
import React, { useState } from 'react';
import AddFriendForm from './AddFriendForm';
import './Friends.css';

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
    setShowAddFriendForm(false);
  };

  const handleCancel = () => {
    setShowAddFriendForm(false);
  }

  const handleRemoveFriend = (id: number) => {
    const filteredFriends = friends.filter(friend => friend.id !== id);
    setFriends(filteredFriends);
  };

  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  

  return (
    <div>
      <table>
        <caption>
          Lista de amigos
        </caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Web Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>{friend.id}</td>
              <td><button className='button delete-button' onClick={() => handleRemoveFriend(friend.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddFriendForm ? (
        <div>
          <AddFriendForm onAddFriend={handleAddFriend} onCancel={handleCancel} />
        </div>
      ) : (
        <div className='add-friend-container'>
          <button className='button accept-button add-friend-button' type="button" onClick={() => setShowAddFriendForm(true)}>Agregar amigo</button>
        </div>
      )}
    </div>
  );
};

/*
      <AddFriendForm onAddFriend={handleAddFriend} />
    </div>
  );
};
*/

export default FriendsList;
