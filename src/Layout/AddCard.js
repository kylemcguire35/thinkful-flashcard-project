import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import FormComponent from "./FormComponent";
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
          <FormComponent formData={formData} setFormData={setFormData} />
          <button onClick={handleDone}>Done</button>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default AddCard;
