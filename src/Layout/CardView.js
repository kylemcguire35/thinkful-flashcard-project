import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CardView({ cards }) {
  const [index, setIndex] = useState(0);
  const [card, setCard] = useState(cards[index]);
  const [flipped, setFlipped] = useState(false);
  const history = useHistory();

  function handleFlip() {
    flipped ? setFlipped(false) : setFlipped(true);
  }

  function handleNext() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setIndex(0);
      } else {
        history.push("/");
      }
    }
  }

  useEffect(() => {
    setCard(cards[index]);
    setFlipped(false);
  }, [index, cards]);

  return (
    <>
      {cards && cards.length ? (
        <>
          <h3>{`Card ${index + 1} of ${cards.length}`}</h3>
          <>
            {!flipped ? (
              <>
                <p>{card.front}</p>
                <button onClick={handleFlip}>Flip</button>
              </>
            ) : (
              <>
                <p>{card.back}</p>
                <button onClick={handleFlip}>Flip</button>
                <button onClick={handleNext}>Next</button>
              </>
            )}
          </>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CardView;
