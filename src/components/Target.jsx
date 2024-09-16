import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

const Target = ({ className, radius }) => {
  const canvasRef = useRef(null);

  const renderCircle = useCallback(() => {
    const x = radius;
    const y = radius;

    const ctx = canvasRef.current.getContext('2d');
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#5eff00';
    ctx.fill();
  }, [radius]);

  useEffect(() => {
    renderCircle();
  }, [renderCircle]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={radius * 2}
      height={radius * 2}
    ></canvas>
  );
};

const StyledTarget = styled(Target).attrs((props) => ({
  radius: props.radius || 10,
}))`
  position: absolute;
  top: ${(props) => props.$clickedPosition.y - props.radius + 'px'};
  left: ${(props) => props.$clickedPosition.x - props.radius + 'px'};
`;

Target.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
};

export default StyledTarget;
