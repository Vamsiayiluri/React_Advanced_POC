import React, { useEffect, useState } from "react";
import {
  fetchData,
  writeData,
  updateData,
  deleteData,
} from "../hooks/useFirebaseData";
interface UserData {
  name: string;
  age: number;
  email: string;
}

const FirebaseExample: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [path, setPath] = useState<string>("users/user1");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      if (path.trim()) {
        const result = await fetchData(path);
        setData(result);
      }
    };

    fetchDataFromFirebase();
  }, [path]);

  const handleWriteData = async () => {
    if (name && age && email) {
      const newData: UserData = { name, age: Number(age), email };
      await writeData(path, newData);
      alert("Data written successfully!");
    } else {
      alert("Please fill in all fields to write data.");
    }
  };

  const handleUpdateData = async () => {
    const updatedData: Partial<UserData> = {};
    if (name) updatedData.name = name;
    if (age) updatedData.age = Number(age);
    if (email) updatedData.email = email;

    if (Object.keys(updatedData).length > 0) {
      await updateData(path, updatedData);
      alert("Data updated successfully!");
    } else {
      alert("Please provide at least one field to update.");
    }
  };

  const handleDeleteData = async () => {
    await deleteData(path);
    alert("Data deleted successfully!");
    setData(null);
  };

  return (
    <div>
      <h2>Interceptors Sample</h2>

      <div>
        <label>
          Path:
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Enter database path"
          />
        </label>
      </div>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </label>
      </div>

      <div>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value ? Number(e.target.value) : "")
            }
            placeholder="Enter age"
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </label>
      </div>

      <div>
        <button onClick={handleWriteData}>Write Data</button>
        <button onClick={handleUpdateData}>Update Data</button>
        <button onClick={handleDeleteData}>Delete Data</button>
      </div>

      <div>
        <h2>Fetched Data:</h2>
        {data ? (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Age:</strong> {data.age}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default FirebaseExample;
