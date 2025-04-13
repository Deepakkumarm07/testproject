import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    food: "",
    shows: [],
    file: null,
  });

  const [submitted, setSubmitted] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        shows: checked
          ? [...prev.shows, value]
          : prev.shows.filter((show) => show !== value),
      }));
    } else if (type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("dob", formData.dob);
    data.append("food", formData.food);
    data.append("shows", JSON.stringify(formData.shows));
    data.append("file", formData.file);

    try {
      const res = await axios.post("http://localhost:5000/api/sql/upload", data);
      alert("Form submitted!");
      setSubmitted([...submitted, res.data]);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Form with File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
        <input name="dob" type="date" onChange={handleChange} /><br />
        Favorite Food:
        <label><input type="radio" name="food" value="Pizza" onChange={handleChange} /> Pizza</label>
        <label><input type="radio" name="food" value="Burger" onChange={handleChange} /> Burger</label><br />
        Favorite Shows:
        <label><input type="checkbox" name="shows" value="Friends" onChange={handleChange} /> Friends</label>
        <label><input type="checkbox" name="shows" value="Breaking Bad" onChange={handleChange} /> Breaking Bad</label><br />
        Upload File:
        <input type="file" name="file" onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Data</h3>
      {submitted.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Phone: {item.phone}</p>
          <p>DOB: {item.dob}</p>
          <p>Food: {item.food}</p>
          <p>Shows: {item.shows.join(", ")}</p>
          <p>Uploaded File: {item.file_path}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
