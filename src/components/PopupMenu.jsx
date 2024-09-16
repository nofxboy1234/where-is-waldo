import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupMenu = ({ className }) => {
  const checkWithBackend = (e) => {
    console.log('check with backend');
    console.log({
      character: e.target.textContent,
    });
  };

  return (
    <div className={className}>
      <CharacterDiv onClick={checkWithBackend}>Character 1</CharacterDiv>
      <CharacterDiv onClick={checkWithBackend}>Character 2</CharacterDiv>
      <CharacterDiv onClick={checkWithBackend}>Character 3</CharacterDiv>
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
  top: ${(props) => props.$clickedPosition.y + 'px'};
  left: ${(props) => props.$clickedPosition.x + 'px'};
`;

PopupMenu.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default StyledPopupMenu;
