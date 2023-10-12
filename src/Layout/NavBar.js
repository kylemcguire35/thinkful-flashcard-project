import React from "react";
import { useHistory, Link } from "react-router-dom";

function NavBar({ deck }) {
  const history = useHistory();
  const pathname = history.location.pathname;
  let pathArr = pathname.split("/").filter((name) => name !== "");

  if (pathArr[1] === "new") {
    return (
      <ol className="list-unstyled d-flex">
        <li>
          <Link to="/">Home</Link>
        </li>
        /<li>Create Deck</li>
      </ol>
    );
  } else {
    if (pathArr[2] === "edit") {
      return (
        <ol className="list-unstyled d-flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          /
          <li>
            <Link to={`/decks/${pathArr[1]}`}>{deck.name}</Link>
          </li>
          /<li>Edit Deck</li>
        </ol>
      );
    } else if (pathArr[2] === "study") {
      return (
        <ol className="list-unstyled d-flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          /
          <li>
            <Link to={`/decks/${pathArr[1]}`}>{deck.name}</Link>
          </li>
          /<li>Study</li>
        </ol>
      );
    } else if (pathArr[2] === "cards") {
      if (pathArr[3] === "new") {
        return (
          <ol className="list-unstyled d-flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            /
            <li>
              <Link to={`/decks/${pathArr[1]}`}>{deck.name}</Link>
            </li>
            /<li>Add Card</li>
          </ol>
        );
      } else {
        return (
          <ol className="list-unstyled d-flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            /
            <li>
              <Link to={`/decks/${pathArr[1]}`}>{deck.name}</Link>
            </li>
            /<li>{`Edit Card ${pathArr[3]}`}</li>
          </ol>
        );
      }
    } else {
      return (
        <ol className="list-unstyled d-flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          /<li>{deck.name}</li>
        </ol>
      );
    }
  }
}

export default NavBar;
