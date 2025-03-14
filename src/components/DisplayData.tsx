import { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User {
  id?: string; // id is optional, as it will only be available after data is fetched
  name: string;
  age: number;
}

const DisplayData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newAge, setNewAge] = useState<number>(0);
  const [newName, setNewName] = useState<string>('');

  // Update user function
  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, updatedData);
    alert("User updated successfully!");
  };

  // Delete user function
  const deleteUser = async (userId: string) => {
    await deleteDoc(doc(db, 'users', userId));
    alert("User deleted successfully!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: '2px solid black', margin: '10px' }}
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>

            <button onClick={() => deleteUser(user.id!)}>Delete</button>

            {/* Update User button */}
            <button onClick={() => updateUser(user.id!, { name: newName, age: newAge })}>
              Update
            </button>
          </div>
        </div>
      ))}
      
      {/* Inputs for updating */}
      <div>
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Age"
          value={newAge}
          onChange={(e) => setNewAge(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default DisplayData;

