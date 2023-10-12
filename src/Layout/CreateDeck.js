import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => {
    history.push("/");
  };

  async function createDeckFromAPI() {
    const response = await createDeck(formData);
    history.push(`/decks/${response.id}`);
    window.location.reload();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeckFromAPI();
    setFormData({ ...initialFormState });
  };

  return (
    <>
      <NavBar />
      <h1>Create Deck</h1>
      <form>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Deck Name"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Brief description of the deck"
          ></textarea>
        </label>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateDeck;
