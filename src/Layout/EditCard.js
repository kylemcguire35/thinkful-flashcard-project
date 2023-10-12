import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import { updateCard, readDeck, readCard } from "../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({});
  const [deck, setDeck] = useState();
  const history = useHistory();

  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);
      setFormData({
        front: response.front,
        back: response.back,
        id: response.id,
        deckId: response.deckId,
      });
    }

    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck({
        name: response.name,
      });
    }

    loadCard();
    loadDeck();
  }, [cardId, deckId]);

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

  async function updateCardFromAPI() {
    await updateCard(formData);
    setFormData({});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCardFromAPI();
    history.goBack();
  };

  return (
    <>
      {deck ? (
        <>
          <NavBar deck={deck} cardId={cardId} />
          <h2>Edit Card</h2>
          <form>
            <label htmlFor="front">
              Front
              <textarea
                id="front"
                type="text"
                name="front"
                onChange={handleChange}
                value={formData.front}
              ></textarea>
            </label>
            <label htmlFor="back">
              Back
              <textarea
                id="back"
                type="text"
                name="back"
                onChange={handleChange}
                value={formData.back}
              ></textarea>
            </label>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default EditCard;
