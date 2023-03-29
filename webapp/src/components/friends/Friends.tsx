import React, { useState, useEffect } from 'react';
import AddFriendForm from './AddFriendForm';
import './Friends.css';

import { PersonData, findPersonData } from './FriendList'
import { useSession } from '@inrupt/solid-ui-react';
import { IriString } from '@inrupt/solid-client';
import { addFriendByWebId, deleteFriendByWebId } from '../../helpers/SolidHelper';


const FriendsList: React.FC = () => {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const { session } = useSession();
  const [personData, setPersonData] = useState<PersonData>({ webId: '', name: '', photo: '', friends: [] })

  const [friends, setFriendList] = useState<PersonData[]>([]);

  useEffect(() => {
    const loadPersonData = async () => {
      const webId = session.info.webId
      const data = await findPersonData(webId!)
      setPersonData(data)
    }
    loadPersonData()

    async function fetchFriends() {
      const names = await Promise.all(
        personData.friends.map((friend) => findPersonData(friend))
      );
      setFriendList(names);
    }
    fetchFriends();

  }, [session])

  

  

  const handleAddFriend = async (webId: string) => {
    addFriendByWebId(session.info.webId!, webId);
    setShowAddFriendForm(false);
  };
  const handleCancel = () => {
    setShowAddFriendForm(false);
  };

  const handleRemoveFriend = (webId: string) => {
    deleteFriendByWebId(session.info.webId!, webId);
  };


  /*
  const miFuncion = async (webId: string) => {
    const amigos = await findFriends(webId)
    console.log(amigos)
    amigos.friends.forEach(element => {
      console.log(element);
    })
  }

  console.log(session.info.webId!)
  miFuncion(session.info.webId!);
  */

  return (
    <div id='div-friends'>
      <table id='table-friends'>
        <caption>
          Lista de amigos
        </caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Web Id</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => (
            <tr key={friend.webId}>
              <td>{friend.name}</td>
              <td><a href={friend.webId}>{friend.webId}</a></td>
              <td><img src={friend.photo} alt="Foto de amigo" /></td>
              <td><button className='button delete-button' onClick={() => handleRemoveFriend(friend.webId)}>Eliminar</button></td>
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

