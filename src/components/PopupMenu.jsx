import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupMenu = ({
  className,
  clickedPosition,
  updateCharacterTarget,
  characters,
  token,
  setToken,
  login_anonymously,
  initializeCharacters,
}) => {
  const checkWithBackend = (e) => {
    const id = e.target.dataset.id;

    fetch(
      `http://localhost:3000/characters/${id}/find?x=${clickedPosition.x}&y=${clickedPosition.y}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((data) => {
        if (data.found) {
          console.log(`Found ${data.name}!`);
          setToken(data.token);
          updateCharacterTarget({
            id: Number(id),
            name: data.name,
            position: clickedPosition,
          });
          if (data.all_found) {
            console.log('You found all the characters!');
            console.log(`Your score is ${data.score}s`);
            login_anonymously();
            initializeCharacters();
          }
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
  token: PropTypes.string,
  setToken: PropTypes.func,
  login_anonymously: PropTypes.func,
  initializeCharacters: PropTypes.func,
};

export default StyledPopupMenu;
