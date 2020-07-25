import React from 'react';
import './Quiz.css'
import QuizMaster from "./QuizMaster";

const Quiz = () => {
    return (
        <div className="quiz-page">
            <h1 className="ui header app-secondary-color app-header"  >
                <i><b>QUIZ</b></i>
            </h1>
            <br></br>
            <div className="ui container">
                <QuizMaster />
            </div>
            <br /><br /><br />
        </div>
    )
}

export default Quiz;