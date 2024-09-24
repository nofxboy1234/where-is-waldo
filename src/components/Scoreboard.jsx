import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

let count = 0;

const Scoreboard = ({ className, characters }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!characters.every((character) => character.position === null)) {
      return;
    }

    const id = ++count;
    let ignore = false;
    Promise.resolve().then(() => {
      if (ignore) {
        return;
      }
      console.log(`Running Scoreboard effect with id: ${id}`);
      initializeScores();
    });
    return () => {
      ignore = true;
    };
  }, [characters]);

  function initializeScores() {
    fetch(`http://localhost:3000/scores`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((data) => {
        const initialScores = data.map((score) => {
          return {
            id: score.id,
            name: score.name,
            time: score.time,
          };
        });
        setScores(initialScores);
      })
      .catch((error) => console.error(error));
  }

  console.log('Rendering Scoreboard');

  return (
    <div className={className}>
      <div>Scoreboard:</div>
      <div>
        {scores.map((score) => (
          <div key={score.id} id={`score-${score.id}`} data-id={score.id}>
            {score.name} - {score.time}s
          </div>
        ))}
      </div>
    </div>
  );
};

const StyledScoreboard = styled(Scoreboard)`
  padding: 1rem;
  border: 2px solid black;
  width: fit-content;
  margin: 1rem;
  position: fixed;
  z-index: 1;
  color: black;
  background-color: rgb(255 255 255 / 80%);
  top: 100px;
`;

Scoreboard.propTypes = {
  characters: PropTypes.array,
};

export default StyledScoreboard;
