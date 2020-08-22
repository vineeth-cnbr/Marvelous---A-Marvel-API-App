import React, { useState } from 'react';
import { socket } from '../../apis/sockets';
import { NUMBER_OF_QUESTIONS, PASS, events } from '../../constants';
import { useEffect } from 'react';

const Question = ({ gameId, question, number, next }) => {
  const { imageUrl: propImageUrl, options } = question;
  const [imageUrl, setImageUrl] = useState(propImageUrl);
  const [answer, setAnswer] = useState(null);

  //Register for result only once!!
  useEffect(() => {
    //When result is returned
    socket.on(events.RESULT, () => {
      next();
    }); // eslint-disable-next-line
  }, []);

  // Update image url when prop changes
  useEffect(() => {
    setImageUrl(propImageUrl);
    setAnswer(null);
  }, [propImageUrl]);

  //On button click to set answer to state
  const onAnswer = (e) => {
    setAnswer(e.target.textContent);
    e.target.blur();
    // console.log('e', e.target.blur());
  };

  //On click of button to submit the answer
  const onSubmit = (e) => {
    e.preventDefault();
    if (answer !== PASS) {
      socket.emit(events.ANSWER, {
        gameId,
        questionId: question.questionId,
        answer,
      });
      setImageUrl('');
      setAnswer(null);
    } else {
      //Set image url to blank so that the next question does not show previous image
      setImageUrl('');
      setAnswer(null);
      next(null);
    }
  };

  return (
    <>
      <div className='arena'>
        <div style={{ justifyContent: 'center' }}>
          <h1 className='app-font'>Identify The Character</h1>
          <div className='ui card fluid image '>
            <img
              style={{ height: 357, width: 357 }}
              src={imageUrl}
              alt='question'
            />
          </div>
          <div style={{ fontSize: '1.2rem' }}>
            #{number}/{NUMBER_OF_QUESTIONS}
          </div>
        </div>
        <div
          style={{
            fontSize: '1.2rem',
            color: 'yellow',
          }}
        >
          <h4>Game points</h4>
          <li>Correct answer: +10 points</li>
          <li>Wrong answer: -5 points</li>
          <li>Pass: 0 points</li>
        </div>
        {/* <div>{isCorrect ? <i className='green check icon'></i> : null}</div> */}
      </div>
      <br />

      <div className={'arena'}>
        <form onSubmit={onSubmit}>
          <div className='quiz-options-grid-1'>
            <button
              className='ui grid-item inverted violet button option'
              onClick={onAnswer}
              type='submit'
            >
              {options[0]}
            </button>
            <button
              className='ui grid-item inverted violet button option'
              onClick={onAnswer}
              type='submit'
            >
              {options[1]}
            </button>
            <button
              className='ui grid-item inverted violet button option'
              onClick={onAnswer}
              type='submit'
            >
              {options[2]}
            </button>
          </div>
          <div className='quiz-options-grid-2'>
            <button
              className='ui grid-item inverted violet button option'
              onClick={onAnswer}
              type='submit'
            >
              {options[3]}
            </button>
            <button
              className='ui grid-item inverted violet button option'
              onClick={onAnswer}
              type='submit'
            >
              {options[4]}
            </button>
          </div>
          <div className='quiz-options-grid-2'>
            <button
              className='ui grid-item inverted red button option'
              onClick={onAnswer}
              type='submit'
            >
              {PASS}
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
};

export default Question;
