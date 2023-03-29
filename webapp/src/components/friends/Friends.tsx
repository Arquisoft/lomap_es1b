import React, { useState, useEffect } from 'react';
import AddFriendForm from './AddFriendForm';
import './Friends.css';

import { PersonData, findFriends } from './FriendList'
import { useSession } from '@inrupt/solid-ui-react';
import { IriString } from '@inrupt/solid-client';


const FriendsList: React.FC = () => {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const { session } = useSession();
  const [personData, setPersonData] = useState<PersonData>({ name: '', photo: '', friends: [] })

  useEffect(() => {
    const loadPersonData = async () => {
      const webId = session.info.webId
      const data = await findFriends(webId!)
      setPersonData(data)
    }
    loadPersonData()
  }, [session])

  

  

  const handleAddFriend = async (id: string) => {
    console.log("NOT YET IMPLEMENTED")
    setShowAddFriendForm(false);
  };
  const handleCancel = () => {
    setShowAddFriendForm(false);
  };

  const handleRemoveFriend = (id: string) => {
    console.log("NOT YET IMPLEMENTED")
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {personData.friends.map(friend => (
            <tr key={friend}>
              <td></td>
              <td><a href={friend}>{friend}</a></td>
              <td><button className='button delete-button' onClick={() => handleRemoveFriend(friend)}>Eliminar</button></td>
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

