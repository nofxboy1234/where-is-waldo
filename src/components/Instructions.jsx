import styled from 'styled-components';
import PropTypes from 'prop-types';
import Waldo from './Waldo';

const Instructions = ({ className }) => {
  return (
    <>
      <div className={className}>
        <div>
          Find all 3 characters by clicking their position in the image and
          choosing their name.
        </div>
        <div>
          A target icon will be placed when the correct character is identified.
        </div>
      </div>
      <Waldo />
    </>
  );
};

const StyledInstructions = styled(Instructions)`
  padding: 1rem;
  border: 2px solid black;
  width: fit-content;
  margin: 1rem;
  position: fixed;
  z-index: 1;
  color: black;
  background-color: rgb(255 255 255 / 80%);
`;

Instructions.propTypes = {
  className: PropTypes.string,
};

export default StyledInstructions;
