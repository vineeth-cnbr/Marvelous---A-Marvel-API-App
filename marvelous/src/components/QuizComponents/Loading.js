import React from 'react';

const Loading = ({ progress, onStart }) => {
  let loadingText = `Loading ${Math.floor(progress)}% ...`;

  if (progress === 100) {
    loadingText = 'Starting Quiz!';
    setTimeout(() => {
      onStart();
    }, 2000);
  }

  return (
    <div className='loading-question'>
      <div
        className={`ui indicating inverted progress ${
          progress === 100 ? 'success' : null
        }`}
        style={{ alignSelf: 'center' }}
      >
        <div className='bar' style={{ width: `${progress}%` }}>
          <div className='progress'></div>
        </div>
        <div className='label'>{loadingText}</div>
      </div>
    </div>
  );
};

export default Loading;
