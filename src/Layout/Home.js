import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home({ decks, handleDelete }) {
  return (
    <>
      {decks && decks.length ? (
        <>
          <Link to="/decks/new">Create Deck</Link>
          <DeckList decks={decks} handleDelete={handleDelete} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Home;
