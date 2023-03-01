import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import { getUsers } from './api/api';
import { User } from './shared/shareddtypes';
import './App.css';

function App(): JSX.Element {

  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<string>("");

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  const refreshUserName = async (name:string) => {
    setUser(name)
  }

  useEffect(() => {
    refreshUserList();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message={user} />
        <Box component="div" sx={{ py: 2 }}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
        <EmailForm OnUserListChange={refreshUserList} />
        <UserList users={users} />
        <LoginForm OnUserIsLoggedChange={refreshUserName} />
        <Link href="https://github.com/arquisoft/lomap_0">Source code</Link>
      </Container>
    </>
  );
}

export default App;
