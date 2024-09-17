import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PopupMenu from './PopupMenu';

const SearchImage = ({ className }) => {
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);

  function togglePopupMenu(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickedPosition({ x, y });
    setShowPopup((showPopup) => !showPopup);
  }

  return (
    <div className={className} onClick={togglePopupMenu}>
      {showPopup && <PopupMenu clickedPosition={clickedPosition} />}
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
