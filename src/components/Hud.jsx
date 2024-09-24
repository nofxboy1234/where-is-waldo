import styled from 'styled-components';
import PropTypes from 'prop-types';
import Instructions from './Instructions';
import Scoreboard from './Scoreboard';
import Waldo from './Waldo';
import Wenda from './Wenda';
import Woof from './Woof';

const Hud = ({ className }) => {
  return (
    <div className={className}>
      <Instructions />
      <Scoreboard />
      <Waldo />
      <Wenda />
      <Woof />
    </div>
  );
};

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`;

const StyledHud = styled(Hud)`
  display: grid;
  grid-template: 80px 270px / 250px 115px 115px 150px;
  gap: 10px;
  margin: 1rem;
  position: fixed;
  z-index: 1;
  color: black;
  /* background-color: white; */

  /* &:hover {
    opacity: 50%;
  } */
`;

Hud.propTypes = {
  className: PropTypes.string,
};

export default StyledHud;
