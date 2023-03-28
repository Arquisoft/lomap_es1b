import React, { useState, useEffect } from 'react';
import AddFriendForm from './AddFriendForm';
import './Friends.css';
import {getUserFriends, getUsers, getUser, addUser, addFriend} from '../../api/API';
import {User} from '../../shared/SharedTypes';


const FriendsList: React.FC = () => {
  // Inncesario más adelante.
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);

        if (fetchedUsers.length === 0) {
          // Inicialización de pega:
          defaultConfiguration();
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchFriends() {
      try {
        // takes first id
        const id = (await getUsers()) [0].id;
        const fetchedFriends = await getUserFriends(id);
        setFriends(fetchedFriends);
        setIsLoading(false);

      } catch (error) {
        console.error(error);
      }
    }
    fetchFriends();
  }, []);

  const handleAddFriend = async (id: string) => {
    const user = users.find(user => user.id === id);
    if (user) {

    } else {
      return ;
    }
    const newFriend : User = user
    
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
        <caption>
          Lista de usuarios
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.id}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table id='table-friends'>
        <caption>
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

function defaultConfiguration() {
  addUser('Juan', 'juan' + '@uniovi.es');
  addUser('Pedro', 'pedro' + '@uniovi.es');
  addUser('Mateo', 'mateo' + '@uniovi.es');
  addUser('Marcos', 'marcos' + '@uniovi.es');
}

export default FriendsList;

