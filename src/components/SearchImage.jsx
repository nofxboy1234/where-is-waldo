import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchImage = ({ className, onClick }) => {
  return <div className={className} onClick={onClick}></div>;
};

const StyledSearchImage = styled(SearchImage)`
  width: 500px;
  height: 500px;
  background-color: #1d1d1d;
`;

SearchImage.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default StyledSearchImage;
