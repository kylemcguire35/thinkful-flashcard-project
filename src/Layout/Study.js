import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CardView from "./CardView";
import NavBar from "./NavBar";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      {deck.cards ? (
        <>
          <NavBar deck={deck} />
          <h1>{`Study: ${deck.name}`}</h1>
          {deck.cards.length > 2 ? (
            <CardView cards={deck.cards} />
          ) : (
            <>
              <h2>Not enough cards.</h2>
              <p>{`You need at least 3 cards to study. There
                ${
                  deck.cards.length === 1
                    ? "is 1 card"
                    : `are ${deck.cards.length} cards`
                }
              in this deck.`}</p>
              <Link to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Study;
