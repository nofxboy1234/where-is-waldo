import styled from 'styled-components';
import PropTypes from 'prop-types';
import waldoCharacter from '../assets/character_waldo.png';

const Waldo = ({ className }) => {
  return (
    <div className={className}>
      <img src={waldoCharacter} alt="Waldo Character" />
      <CharacterName>Waldo</CharacterName>
    </div>
  );
};

const StyledWaldo = styled(Waldo)`
  display: flex;
  justify-content: end;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
`;

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`;

Waldo.propTypes = {
  className: PropTypes.string,
};

export default StyledWaldo;
