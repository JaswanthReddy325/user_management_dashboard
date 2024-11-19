import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from './api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
    } catch {
      alert('Error adding user');
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const user = await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null);
    } catch {
      alert('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      alert('Error deleting user');
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserList 
        users={users} 
        onEdit={setEditingUser} 
        onDelete={handleDeleteUser} 
      />
      <UserForm 
        editingUser={editingUser} 
        onSave={editingUser ? handleUpdateUser : handleAddUser} 
        onCancel={() => setEditingUser(null)} 
      />
    </div>
  );
}

export default App;

