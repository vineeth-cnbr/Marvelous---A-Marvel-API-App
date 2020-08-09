import React from 'react';

const StartGameButton = ({ onStart, name }) => {
    return (
        <button
            className='huge ui green icon button'
            onClick={(e) => onStart()}
            disabled={!name}
            type='submit'
        >
            <i className='icon flag checkered'></i> START QUIZ
        </button>
    )
}

export default StartGameButton;