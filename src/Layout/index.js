import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import Deck from "./Deck";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import { listDecks } from "../utils/api";
import { deleteDeck } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, []);

  const history = useHistory();

  async function deleteDeckfromAPI(deckId) {
    await deleteDeck(deckId);
    const response = await listDecks();
    setDecks(response);
    history.push("/");
    window.location.reload();
  }

  const handleDelete = (deckId) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    )
      deleteDeckfromAPI(deckId);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} handleDelete={handleDelete} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck handleDelete={handleDelete} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
