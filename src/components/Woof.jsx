import styled from 'styled-components';
import PropTypes from 'prop-types';
import woofCharacter from '../assets/character_woof.png';

const Woof = ({ className }) => {
  return (
    <div className={className}>
      <img src={woofCharacter} alt="Waldo Character" />
      <CharacterName>Woof</CharacterName>
    </div>
  );
};

const StyledWoof = styled(Woof)`
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

Woof.propTypes = {
  className: PropTypes.string,
};

export default StyledWoof;
