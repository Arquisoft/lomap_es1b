import React, { useState, useEffect } from 'react';
import AddFriendForm from './AddFriendForm';
import './Friends.css';
import {getUserFriends, getUsers} from '../../api/api';
import {User} from '../../shared/shareddtypes'


const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const fetchedFriends = await getUsers();
        setFriends(fetchedFriends);
        setIsLoading(false);

        if (fetchedFriends.length === 0) {
          setFriends([
            {id: String(1), name: 'Juan', email: 'juan' + '@uniovi.es', friends: []}
            , {id: String(2), name: 'Pedro', email: 'pedro' + '@uniovi.es', friends: []}
            , {id: String(3), name: 'Mateo', email: 'mateo' + '@uniovi.es', friends: []}
            , {id: String(4), name: 'Marcos', email: 'marcos' + '@uniovi.es', friends: []}
          ])
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchFriends();
  }, []);

  const handleAddFriend = (name: string) => {
    const newFriend: User = {
      id: String(friends.length + 1),
      name,
      email: name + '@uniovi.es',
      friends: []
    };
    setFriends([...friends, newFriend]);
    setShowAddFriendForm(false);
  };

  const handleCancel = () => {
    setShowAddFriendForm(false);
  };

  const handleRemoveFriend = (id: string) => {
    const filteredFriends = friends.filter(friend => friend.id !== id);
    setFriends(filteredFriends);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id='div-friends'>
      <table id='table-friends'>
        <caption id='table-caption-friends'>
          Lista de amigos
        </caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Web Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>{friend.email}</td>
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

export default FriendsList;

