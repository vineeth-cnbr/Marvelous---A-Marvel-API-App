import React, { useEffect, useState } from 'react';
import './Result.css';
import StartGameButton from './StartGameButton';
import marvel from '../../apis/marvel';
import HighScores from './HighScores';

const Result = ({ gameId, onStart, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState();

  useEffect(() => {
    marvel
      .get('score', { params: { gameId } })
      .then(({ data }) => {
        setIsLoading(false);
        setPoints(data.score);
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
      <h2>You got {points} points !!</h2>
      <h3>Wanna go again? </h3>
      <StartGameButton onStart={onStart} name={name} />
      <br />
      <br />
      <HighScores />
    </div>
  );
};

export default Result;
