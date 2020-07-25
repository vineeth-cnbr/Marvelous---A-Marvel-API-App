import React from 'react';
import './Quiz.css'
const StartPage = (props) => {
    return (
        <div className="start">
            <button className="huge ui green icon button" onClick={(e) => props.onStart()} ><i className="icon flag checkered"></i>  START QUIZ</button>
        </div>
    )
}

export default StartPage;