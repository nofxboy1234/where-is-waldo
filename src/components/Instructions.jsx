import styled from 'styled-components';
import PropTypes from 'prop-types';

const Instructions = ({ className }) => {
  return (
    <>
      <div className={className}>
        <div>
          <div>
            Find all 3 characters by clicking their position in the image and
            choosing their name.
          </div>
          <div>
            A target icon will be placed when the correct character is
            identified.
          </div>
        </div>
      </div>
    </>
  );
};

const StyledInstructions = styled(Instructions)`
  grid-column-start: 1;
  grid-column-end: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 1rem; */
  border: 2px solid black;
  /* width: fit-content; */
  /* margin: 1rem; */
  /* position: fixed; */
  /* z-index: 1; */
  color: black;
  background-color: white;
  border: 2px solid black;
`;

Instructions.propTypes = {
  className: PropTypes.string,
};

export default StyledInstructions;
