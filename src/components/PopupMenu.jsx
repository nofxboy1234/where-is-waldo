import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupMenu = ({ className }) => {
  return (
    <div className={className}>
      <div>Character 1</div>
      <div>Character 2</div>
      <div>Character 3</div>
    </div>
  );
};

const StyledPopupMenu = styled(PopupMenu)`
  width: 150px;
  height: 150px;
  background-color: #2c2c2c;
`;

PopupMenu.propTypes = {
  className: PropTypes.string,
};

export default StyledPopupMenu;
