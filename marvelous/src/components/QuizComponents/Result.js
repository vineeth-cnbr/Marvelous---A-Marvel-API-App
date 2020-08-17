import React, { useEffect, useState } from 'react';
import './Result.css';
import StartGameButton from './StartGameButton';
import marvel from '../../apis/marvel';
import HighScores from './HighScores';

const Result = ({ gameId, onStart, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState();
  const [numberOfWrong, setNumberOfWrong] = useState(0);
  const [numberOfRight, setNumberOfRight] = useState(0);

  useEffect(() => {
    marvel
      .get('score', { params: { gameId } })
      .then(({ data }) => {
        setIsLoading(false);
        setPoints(data.game.score);
        setNumberOfRight(data.game.correctAnswers);
        setNumberOfWrong(data.game.wrongAnswers);
      })
      .catch((error) => console.error(error));
  }, [gameId]);

  if (isLoading) {
    return (
      <div className=''>
        <p></p>
        <div className='ui active dimmer'>
          <div className='ui loader'></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className=' ui green header'>
        Congratulations!! <br></br>
      </h1>
      <h2>
        You got{' '}
        <span style={{ color: 'yellow', fontSize: '2.5rem' }}>{points}</span>{' '}
        Points !!
      </h2>
      <h3>
        That's <span style={{ color: 'yellow' }}>{numberOfRight}</span> correct
        and <span style={{ color: 'red' }}>{numberOfWrong}</span> wrong
      </h3>
      <h3>Wanna go again? </h3>
      <StartGameButton onStart={onStart} name={name} />
      <br />
      <br />
      <HighScores />
    </div>
  );
};

export default Result;
