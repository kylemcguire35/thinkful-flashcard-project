import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardListView({ deck, card }) {
  async function deleteCardFromAPI() {
    await deleteCard(card.id);
  }

  const handleDeleteCard = (event) => {
    event.preventDefault();
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCardFromAPI();
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <p>{card.front}</p>
        <p>{card.back}</p>
      </div>
      <div>
        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
        <button onClick={handleDeleteCard}>Delete</button>
      </div>
    </>
  );
}

export default CardListView;
