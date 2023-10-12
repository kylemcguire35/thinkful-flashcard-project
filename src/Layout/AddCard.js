import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleDone = () => {
    history.push(`/decks/${deck.id}`);
  };

  async function createCardFromAPI() {
    await createCard(deck.id, formData);
  }

  const handleSave = (event) => {
    event.preventDefault();
    createCardFromAPI();
    setFormData({ ...initialFormState });
    window.location.reload();
  };

  return (
    <>
      {deck.id ? (
        <>
          <NavBar deck={deck} />
          <h2>{`${deck.name}: Add Card`}</h2>
          <form>
            <label htmlFor="front">
              Front
              <textarea
                id="front"
                type="text"
                name="front"
                onChange={handleChange}
                value={formData.name}
                placeholder="Front side of card"
              ></textarea>
            </label>
            <label htmlFor="back">
              Back
              <textarea
                id="back"
                type="text"
                name="back"
                onChange={handleChange}
                value={formData.name}
                placeholder="Back side of card"
              ></textarea>
            </label>
            <button onClick={handleDone}>Done</button>
            <button onClick={handleSave}>Save</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default AddCard;
