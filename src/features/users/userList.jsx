import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, addUser } from './userSlice';


const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  const [newNo, setNewNo] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newNo.trim() && newName.trim() && newEmail.trim()) {
      dispatch(addUser({ no: newNo, name: newName, email: newEmail }));
      setNewNo('');
      setNewName('');
      setNewEmail('');
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.no?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container-box'>
      {/* Add User Form */}
      <input
        type="text"
        value={newNo}
        onChange={(e) => setNewNo(e.target.value)}
        placeholder="No." className='input-box'
      />
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Name" className='input-box'
      />
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="Gmail Address" className='input-box'
      />

    <button onClick={handleAddUser} className='add-button'>Add User</button>

      <input
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder=" 🔍 Search by ID, Name, or Email" className='search-button'
      />


      <h2>List of User</h2>
      {/* USER LIST AREA */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <div className="spinner"></div>
          <p>Fetching users...</p>
        </div>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>No.</th><th>Name</th><th>Email</th><th className="delete">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.no}>
                <td>{user.no}</td><td>{user.name}</td><td>{user.email || 'N/A'}</td>
                <td >
                  <button onClick={() => dispatch(deleteUser(user.no))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;