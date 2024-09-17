import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Target from './Target';

const PopupMenu = ({ className, clickedPosition }) => {
  const [showTarget, setShowTarget] = useState(true);

  const isCharacterFound = (data) => {
    if (
      clickedPosition.x >= data.position.x &&
      clickedPosition.x <= data.position.x + data.position.width &&
      clickedPosition.y >= data.position.y &&
      clickedPosition.y <= data.position.y + data.position.height
    ) {
      return true;
    }
    return false;
  };

  const checkWithBackend = (e) => {
    const name = e.target.textContent;
    const id = name.charAt(name.length - 1);

    fetch(`http://localhost:3000/characters/${id}`, {
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
        if (isCharacterFound(data)) {
          console.log(`Found ${data.name}!`);
          setShowTarget(true);
        } else {
          console.log(`${data.name} is not there!`);
          setShowTarget(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={className}>
      <CharacterDiv onClick={checkWithBackend}>Character1</CharacterDiv>
      <CharacterDiv onClick={checkWithBackend}>Character2</CharacterDiv>
      <CharacterDiv onClick={checkWithBackend}>Character3</CharacterDiv>
      <div style={{ position: 'absolute', top: '0px' }}>
        {showTarget && <Target radius={5} />}
      </div>
    </div>
  );
};

const CharacterDiv = styled.div`
  background-color: white;
  color: black;
  padding: 0.5rem 1rem;
  width: 115.5px;

  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const StyledPopupMenu = styled(PopupMenu)`
  position: absolute;
  top: ${(props) => props.clickedPosition.y + 'px'};
  left: ${(props) => props.clickedPosition.x + 'px'};
`;

PopupMenu.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  clickedPosition: PropTypes.object,
};

export default StyledPopupMenu;
