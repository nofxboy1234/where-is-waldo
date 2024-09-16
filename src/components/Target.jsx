import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Target = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    const ctx = canvasRef.current.getContext('2d');
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#5eff00';
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={20}
      height={20}
    ></canvas>
  );
};

const StyledTarget = styled(Target)`
  position: absolute;
  top: ${(props) => props.$y - 10 + 'px'};
  left: ${(props) => props.$x - 10 + 'px'};
`;

Target.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default StyledTarget;
