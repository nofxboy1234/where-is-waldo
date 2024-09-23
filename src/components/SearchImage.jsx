import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupMenu from './PopupMenu';
import Target from './Target';

const SearchImage = ({ className }) => {
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [allCharactersFound, setAllCharactersFound] = useState(false);
  const [token, setToken] = useState(null);

  const ignoreFetchCharactersEffectRef = useRef(false);
  const ignoreLoginEffectRef = useRef(false);

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
  }

  function login_anonymously() {
    console.log('logging in as anonymous user');
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
        console.log('setting jwt token');
        setToken(data.token);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (ignoreFetchCharactersEffectRef.current === true) {
      return;
    }

    initializeCharacters();

    return () => {
      ignoreFetchCharactersEffectRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (ignoreLoginEffectRef.current === true) {
      return;
    }

    login_anonymously();

    return () => {
      ignoreLoginEffectRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (!allCharactersFound) {
      return;
    }

    console.log('show prompt');
    setTimeout(() => {
      prompt(
        `You found all the characters! Your score is ${99}! Please enter your name for the scoreboard.`,
      );
    });
    // Promise.resolve().then(() => {
    //   prompt(
    //     `You found all the characters! Your score is ${99}! Please enter your name for the scoreboard.`,
    //   );
    // });

    return () => setAllCharactersFound(false);
  }, [allCharactersFound]);

  // // X-CSRF-Token in header?
  // await fetch(`http://localhost:3000/scores/${score.score_id}`, {
  //   method: 'PATCH',
  //   mode: 'cors',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name }),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('server error');
  //     }
  //     setAllCharactersFound(true);
  //   })
  //   .catch((error) => console.error(error));
  // }

  return (
    <div className={className} onClick={togglePopupMenu}>
      {showPopup && (
        <PopupMenu
          clickedPosition={clickedPosition}
          updateCharacterTarget={updateCharacterTarget}
          characters={characters.filter(
            (character) => character.position === null,
          )}
          token={token}
          setToken={setToken}
          setAllCharactersFound={setAllCharactersFound}
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
