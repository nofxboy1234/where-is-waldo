import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Target = ({ className, radius }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    const ctx = canvasRef.current.getContext('2d');
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#5eff00';
    ctx.fill();
  }, [radius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={radius * 2}
      height={radius * 2}
    ></canvas>
  );
};

const StyledTarget = styled(Target)`
  position: absolute;
  top: ${(props) => props.$y - props.radius + 'px'};
  left: ${(props) => props.$x - props.radius + 'px'};
`;

Target.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
};

export default StyledTarget;
