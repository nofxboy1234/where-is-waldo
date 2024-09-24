import styled from 'styled-components';
import PropTypes from 'prop-types';
import waldoCharacter from '../assets/character_waldo.png';

const Waldo = ({ className }) => {
  return (
    <div className={className}>
      <img src={waldoCharacter} alt="Waldo Character" height={'150px'} />
    </div>
  );
};

const StyledWaldo = styled(Waldo)`
  padding: 1rem;
  margin: 1rem;
  position: fixed;
  z-index: 1;
  background-color: rgb(255 255 255 / 100%);
  top: 100px;
  left: 185px;
`;

Waldo.propTypes = {
  className: PropTypes.string,
};

export default StyledWaldo;
