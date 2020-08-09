import React, { useEffect, useState } from 'react';
import marvel from '../../apis/marvel';
import { socket } from '../../apis/sockets';
import { events } from '../../constants';
import _ from 'lodash';

const HighScores = () => {
  const [highScores, setHighscores] = useState([]);
  const [newScore, setNewscore] = useState();

  //When new scores are added
  useEffect(() => {
    console.log('ue', newScore, highScores);
    if (newScore && highScores) {
      let newhighScores = highScores;
      newhighScores.push(newScore); // Add new Scores dynamically
      newhighScores = _.uniqWith(newhighScores, _.isEqual); //Remove duplicates
      newhighScores.sort((score1, score2) => score2.score - score1.score); //Sort the scores by score value
      if (newhighScores.length > 10) {
        // Show only top 10 scores
        newhighScores.pop();
      }
      setHighscores(newhighScores);
    } // eslint-disable-next-line
  }, [newScore, highScores]);

  useEffect(() => {
    //Initially load up the high scores.
    marvel.get('highscores').then(({ data }) => {
      let scores = data.scores;
      scores.reverse();
      setHighscores(scores);
    });
    //Live update the highscores
    socket.on(events.HIGHSCORES, updateHighScore);
    // eslint-disable-next-line
  }, []);

  const updateHighScore = (scores) => {
    setNewscore(scores);
  };

  if (!highScores || highScores.length === 0) {
    return <div>No one has played yet</div>;
  }

  const renderTrophy = (place) => {
    switch (place) {
      case 1:
        return <i style={{ color: '#ffd700' }} class=' trophy icon'></i>;
      case 2:
        return <i style={{ color: '#c0c0c0' }} className=' trophy icon'></i>;
      case 3:
        return <i style={{ color: '#cd7f32' }} className=' trophy icon'></i>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className='app-font'>HIGH SCORES</h1>
      <br />
      <table className='ui very basic collapsing fixed unstackable inverted table'>
        <thead>
          <tr>
            <th>Standing</th>
            <th>Name</th>
            <th style={{ minWidth: '6rem' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map(({ name, score }, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <h4 className='ui inverted'>
                    <p className='header'>{name}</p>
                  </h4>
                </td>
                <td>
                  {score}&emsp;{renderTrophy(index + 1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HighScores;
