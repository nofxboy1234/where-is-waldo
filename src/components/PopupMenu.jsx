import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupMenu = ({
  className,
  clickedPosition,
  updateCharacterTarget,
  characters,
}) => {
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
    const id = e.target.dataset.id;

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
          updateCharacterTarget({
            id: Number(id),
            name: data.name,
            position: clickedPosition,
          });
        } else {
          console.log(`${data.name} is not there!`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={className}>
      {characters.map((character) => (
        <CharacterDiv
          key={character.id}
          id={`character-${character.id}`}
          data-id={character.id}
          onClick={checkWithBackend}
        >
          {character.name}
        </CharacterDiv>
      ))}
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
  updateCharacterTarget: PropTypes.func,
  characters: PropTypes.array,
};

export default StyledPopupMenu;
