import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupMenu from './PopupMenu';
import Target from './Target';
import waldoImage from '../assets/waldo.png';
import Scoreboard from './Scoreboard';
import Hud from './Hud';
import { createContext } from 'react';

export const CharactersContext = createContext([]);

let count = 0;

const SearchImage = ({ className }) => {
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [token, setToken] = useState(null);

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

  function initializeCharacters() {
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
  }

  function login_anonymously() {
    fetch(`http://localhost:3000/users/login_anonymous`, {
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
        setToken(data.token);
      })
      .catch((error) => console.error(error));
  }

  const initializeGame = useCallback(() => {
    initializeCharacters();
    login_anonymously();
  }, []);

  useEffect(() => {
    const id = ++count;
    let ignore = false;
    Promise.resolve().then(() => {
      if (ignore) {
        return;
      }
      initializeGame();
    });
    return () => {
      ignore = true;
    };
  }, [initializeGame]);

  return (
    <CharactersContext.Provider value={characters}>
      <Hud />
      <div className={className} onClick={togglePopupMenu}>
        <StyledImg src={waldoImage} alt="where's waldo beach image" />
        {showPopup && (
          <PopupMenu
            clickedPosition={clickedPosition}
            updateCharacterTarget={updateCharacterTarget}
            characters={characters.filter(
              (character) => character.position === null,
            )}
            token={token}
            setToken={setToken}
            initializeGame={initializeGame}
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
    </CharactersContext.Provider>
  );
};

const StyledImg = styled.img`
  position: relative;
`;

const StyledSearchImage = styled(SearchImage)`
  width: 2560px;
  height: 1600px;
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
