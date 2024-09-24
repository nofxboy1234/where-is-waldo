import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

let count = 0;

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
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
  }, []);

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
    <>
      <div>scoreboard</div>
      {scores.map((score) => (
        <div key={score.id} id={`score-${score.id}`} data-id={score.id}>
          {score.name} - {score.time}s
        </div>
      ))}
    </>
  );
};

const StyledScoreboard = styled(Scoreboard)`
  /* position: absolute;
  top: ${(props) => props.clickedPosition.y + 'px'};
  left: ${(props) => props.clickedPosition.x + 'px'}; */
`;

Scoreboard.propTypes = {};

export default StyledScoreboard;
