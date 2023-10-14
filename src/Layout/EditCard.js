import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import FormComponent from "./FormComponent";
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

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  async function updateCardFromAPI() {
    await updateCard(formData);
    history.goBack();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCardFromAPI();
    setFormData({});
  };

  return (
    <>
      {deck ? (
        <>
          <NavBar deck={deck} cardId={cardId} />
          <h2>Edit Card</h2>
          <FormComponent formData={formData} setFormData={setFormData} />
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default EditCard;
