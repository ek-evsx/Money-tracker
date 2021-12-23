import React, { useEffect, useState } from 'react';

export const CircularProgress = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(props.percentage);
  }, [props.percentage]);

  const viewBox = `0 0 ${props.size} ${props.size}`;
  const radius = (props.size - props.strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <svg width={props.size} height={props.size} viewBox={viewBox}>
      <circle
        fill='none'
        stroke='#ccc'
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
      />
      <circle
        fill='none'
        stroke={props.color}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
        transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
        strokeDasharray={[dash, circumference - dash]}
        strokeLinecap='round'
        style={{ transition: 'all 1.5s' }}
      />
      <text
        fill='white'
        fontSize='30px'
        x='50%'
        y='50%'
        dy='15px'
        textAnchor='middle'
      >
        {props.text}
      </text>
    </svg>
  );
};
