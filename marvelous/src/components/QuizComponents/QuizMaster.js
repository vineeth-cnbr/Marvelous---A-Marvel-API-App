import React, { Component } from 'react';
import StartPage from './StartPage';
import Question from './Question';
import Result from './Result';
import Loading from './Loading';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API + '/quiz');

const VIEWS = {
    START: 0,
    LOADING: 1,
    QUESTION: 2,
    RESULT: 3
}

const NUMBER_OF_QUESTIONS = 5;

// let socket = io('/quiz')

class QuizMaster extends Component {

    state = {
        view: VIEWS.START,
        questions: []
    }

    constructor(props) {
        super(props);
        socket.on('question', this.addQuestion);
    }

    //updates the state to add a question, doesnt return anything
    addQuestion = (question) => {
        console.log("question get", question)
        let questions = this.state.questions;
        questions.push(question);
        let loadingProgress = questions.length / NUMBER_OF_QUESTIONS * 100;
        this.setState({
            questions,
            loadingProgress
        });

    }

    //When the user clicks start quiz
    onStartLoading = () => {
        this.setState({ view: VIEWS.LOADING });
        for (let index = 0; index < NUMBER_OF_QUESTIONS; index++) {
            socket.emit('requestQuestion');
        }

    }

    //When loading is complete
    onStart = () => {
        this.setState({ view: VIEWS.QUESTION })
    }

    componentWillUnmount = () => {
        socket.emit('disconnect');
    }

    render() {

        let { view, questions, loadingProgress } = this.state;

        switch (view) {
            case VIEWS.START:
                return (
                    <StartPage onStart={this.onStartLoading} />
                );
            case VIEWS.LOADING:
                return (
                    <Loading progress={loadingProgress} onStart={this.onStart} />
                )
            case VIEWS.QUESTION:
                return (
                    <Question question={questions[0]} />
                );
            case VIEWS.RESULT:
                return (
                    <Result />

                );
            default: return null;
        }


    }

}
export default QuizMaster;