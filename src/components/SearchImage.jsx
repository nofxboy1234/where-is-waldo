import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupMenu from './PopupMenu';
import Target from './Target';

const SearchImage = ({ className }) => {
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [characters, setCharacters] = useState([]);

  const ignoreEffectRef = useRef(false);

  function updateCharacterTarget(target) {
    const updatedCharacters = characters.map((character) => {
      if (character.id === target.id) {
        return target;
      } else {
        return character;
      }
    });
    setCharacters(updatedCharacters);
  }

  function togglePopupMenu(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickedPosition({ x, y });
    setShowPopup((showPopup) => !showPopup);
  }

  useEffect(() => {
    if (ignoreEffectRef.current === true) {
      return;
    }

    console.log('fetching characters');
    fetch(`http://localhost:3000/characters`, {
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
        console.log('setting characters');
        const initialCharacters = data.map((character) => {
          return {
            id: character.id,
            name: character.name,
            position: null,
          };
        });
        setCharacters(initialCharacters);
      })
      .catch((error) => console.error(error));

    return () => {
      ignoreEffectRef.current = true;
    };
  }, []);

  return (
    <div className={className} onClick={togglePopupMenu}>
      {showPopup && (
        <PopupMenu
          clickedPosition={clickedPosition}
          updateCharacterTarget={updateCharacterTarget}
          characters={characters.filter(
            (character) => character.position === null,
          )}
        />
      )}
      {characters.map((character) => {
        if (character.position) {
          return (
            <Target
              key={character.id}
              radius={5}
              $position={character.position}
            />
          );
        }
      })}
    </div>
  );
};

const StyledSearchImage = styled(SearchImage)`
  width: 500px;
  height: 500px;
  background-color: #1d1d1d;
  position: relative;
`;

SearchImage.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.object,
  setShowPopup: PropTypes.func,
};

export default StyledSearchImage;
