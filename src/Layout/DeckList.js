import React from "react";
import DeckView from "./DeckView";

function DeckList({ decks, handleDelete }) {
  return (
    <>
      {decks.map((deck, index) => (
        <DeckView
          deck={deck}
          key={index}
          handleDelete={() => handleDelete(deck.id)}
        />
      ))}
    </>
  );
}

export default DeckList;
