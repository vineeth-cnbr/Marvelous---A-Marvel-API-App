import React from 'react';
import './Quiz.css';
import StartGameButton from './StartGameButton';
const StartPage = ({ name, onChangeName, onStart }) => {
  return (
    <form>
      <div className='start'>
        <label>Enter Name:</label>
        <div
          className='ui input inverted small'
          style={{ justifySelf: 'left', padding: '1rem 1rem 1rem 0rem' }}
        >
          <input
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
        <StartGameButton onStart={onStart} name={name} />
      </div>
    </form>
  );
};

export default StartPage;
