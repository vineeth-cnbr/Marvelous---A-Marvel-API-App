import React from 'react';

const Question = ({ question }) => {
  const { imageUrl, options } = question;

  return (
    <>
      <div className='arena'>
        <h1 className='app-font' style={{ justifySelf: 'center' }}>
          Identify The Character
        </h1>
        <div className='ui card fluid image '>
          <img
            src={imageUrl}
            style={{ height: 357, width: 357 }}
            alt='question'
          />
        </div>
      </div>
      <br />
      <div className='quiz-options-grid-1'>
        <button class='ui grid-item inverted violet button option'>
          {options[0]}
        </button>
        <button className='ui grid-item inverted violet button option'>
          {options[1]}
        </button>
        <button className='ui grid-item inverted violet button option'>
          {options[2]}
        </button>
      </div>
      <div className='quiz-options-grid-2'>
        <button className='ui grid-item inverted violet button option'>
          {options[3]}
        </button>
        <button className='ui grid-item inverted violet button option'>
          {options[4]}
        </button>
      </div>
      <div className='quiz-options-grid-2'>
        <button className='ui grid-item inverted red button option'>
          Pass
        </button>
      </div>
    </>
  );
};

export default Question;
