import React, { useState, useEffect } from 'react';

function UserForm({ editingUser, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ id: '', firstName: '', lastName: '', email: '', department: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="firstName" 
        placeholder="First Name" 
        value={formData.firstName} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="text" 
        name="lastName" 
        placeholder="Last Name" 
        value={formData.lastName} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="text" 
        name="department" 
        placeholder="Department" 
        value={formData.department} 
        onChange={handleChange} 
      />
      <button type="submit">Save</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default UserForm;
