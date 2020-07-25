import React from 'react';

const Loading = ({ progress, onStart }) => {
  let loadingText = 'Loading...';

  if (progress === 100) {
    loadingText = 'Starting Quiz!';
    setTimeout(() => {
      onStart();
    }, 2000);
  }

  return (
    <div
      className={`ui inverted progress ${progress === 100 ? 'success' : null}`}
    >
      <div className='bar' style={{ width: `${progress}%` }}>
        <div className='progress'></div>
      </div>
      <div className='label'>{loadingText}</div>
    </div>
  );
};

export default Loading;
