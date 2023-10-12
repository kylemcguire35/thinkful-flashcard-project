import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setFormData({
        name: response.name,
        description: response.description,
        id: response.id,
      });
    }
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  async function updateDeckFromAPI() {
    const response = await updateDeck(formData);
    history.push(`/decks/${response.id}`);
    window.location.reload();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeckFromAPI();
    setFormData({});
  };

  return (
    <>
      {deck ? (
        <>
          <NavBar deck={deck} />
          <h2>Edit Deck</h2>
          <form>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
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
              ></textarea>
            </label>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </>
      ) : (
        <p>/Loading...</p>
      )}
    </>
  );
}

export default EditDeck;
