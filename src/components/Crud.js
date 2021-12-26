import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);

        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [users]);

  //Create user
  const [newName, setNewName] = useState("");
  const [Age, setAge] = useState("");
  const createUser = async () => {
    if (newName !== "" && Age !== "") {
      try {
        await addDoc(usersCollectionRef, { name: newName, age: Number(Age) });
        setAge("");
        setNewName("");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //Update user
  const updateUser = async (id, age) => {
    try {
      const userDoc = doc(db, "users", id);
      const newFields = { age: age + 1 };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Delete User
  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          value={Age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={createUser}>Create user</button>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <div>
              <button onClick={() => updateUser(user.id, user.age)}>
                update
              </button>
              <button onClick={() => deleteUser(user.id)}>delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Crud;
