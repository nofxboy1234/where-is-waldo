import styled from 'styled-components';
import PropTypes from 'prop-types';
import wendaCharacter from '../assets/character_wenda.png';

const Wenda = ({ className }) => {
  return (
    <div className={className}>
      <img src={wendaCharacter} alt="Waldo Character" />
      <CharacterName>Wenda</CharacterName>
    </div>
  );
};

const StyledWenda = styled(Wenda)`
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

Wenda.propTypes = {
  className: PropTypes.string,
};

export default StyledWenda;
