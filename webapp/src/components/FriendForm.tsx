import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { addFriend } from '../api/api';
import { User } from '../shared/shareddtypes';

type FriendFormProps = {
  // currentUser: string;
  
  // currentUser: User;
};

function FriendForm(props: FriendFormProps): JSX.Element {
  // const { currentUser} = props;
  const [userId, setUserId] = useState('');

  const [friendId, setFriendId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addFriend(userId, friendId);
  };

  return (
    <form onSubmit={handleSubmit}>
        <TextField
            required
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            sx={{ my: 2 }}/>

        <TextField
            required
            label="Friend ID"
            variant="outlined"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            sx={{ my: 2 }}/>
            
        <Button variant="contained" type="submit" sx={{ my: 2 }}>
            Add Friend
        </Button>
    </form>
  );
}

export default FriendForm;