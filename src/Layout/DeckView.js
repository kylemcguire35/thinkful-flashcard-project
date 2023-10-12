import React from "react";
import { Link } from "react-router-dom";

function DeckView({ deck, handleDelete }) {
  return (
    <>
      {deck.cards ? (
        <>
          <div>
            <h3>{deck.name}</h3>
            <p>{`${deck.cards.length} cards`}</p>
          </div>
          <div>
            <p>{deck.description}</p>
          </div>
          <div>
            <Link to={`/decks/${deck.id}`}>View</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default DeckView;
