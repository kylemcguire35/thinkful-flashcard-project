import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardListView from "./CardListView";
import NavBar from "./NavBar";
import { readDeck } from "../utils/api";

function Deck({ handleDelete }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  const handleDeleteDeck = () => {
    handleDelete(deck.id);
  };

  return (
    <>
      {deck ? (
        <>
          <NavBar deck={deck} />
          <div>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}>Edit</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <Link to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
            <button onClick={handleDeleteDeck}>Delete</button>
          </div>
          {deck.cards && deck.cards.length > 0 ? (
            <div>
              <h2>Cards</h2>
              {deck.cards.map((card) => (
                <CardListView deck={deck} card={card} />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Deck;
