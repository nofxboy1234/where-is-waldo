import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

let count = 0;

const Scoreboard = ({ className, characters = [] }) => {
  const [scores, setScores] = useState([]);

  // useEffect(() => {
  //   if (!characters.every((character) => character.position === null)) {
  //     return;
  //   }

  //   const id = ++count;
  //   let ignore = false;
  //   Promise.resolve().then(() => {
  //     if (ignore) {
  //       return;
  //     }
  //     initializeScores();
  //   });
  //   return () => {
  //     ignore = true;
  //   };
  // }, [characters]);

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

  return (
    <div className={className}>
      <div>
        <div>Top 3 Scoreboard:</div>
        <div>
          {scores.map((score) => (
            <div key={score.id} id={`score-${score.id}`} data-id={score.id}>
              {score.name} - {score.time}s
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StyledScoreboard = styled(Scoreboard)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  color: black;
  background-color: white;
  border: 2px solid black;
`;

Scoreboard.propTypes = {
  characters: PropTypes.array,
};

export default StyledScoreboard;
