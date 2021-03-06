import React, { Component } from 'react';
import StartPage from './StartPage';
import Question from './Question';
import Result from './Result';
import Loading from './Loading';
import { socket } from '../../apis/sockets';
import { VIEWS, NUMBER_OF_QUESTIONS, events } from '../../constants'


class QuizMaster extends Component {

    state = {
        view: VIEWS.START,
        questions: [],
        currentQuestion: 0,
        loadingProgress: 0,
        name: ''
    }

    constructor(props) {
        super(props);
        socket.on(events.QUESTION, this.addQuestion);
        socket.on(events.GAME, this.startGame);
    }

    //sets gameId to state
    startGame = (gameId) => {
        this.setState({ gameId });
    }

    //restart the game 
    restartGame = () => {
        this.setState({
            view: VIEWS.START,
            questions: [],
            currentQuestion: 0,
            loadingProgress: 0,
            name: ''
        })
    }
    //callback that updates the state to add a question, doesnt return anything
    addQuestion = (question) => {
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
        socket.emit(events.STARTGAME, this.state.name);
        this.setState({ view: VIEWS.LOADING });
        for (let index = 0; index < NUMBER_OF_QUESTIONS; index++) {
            socket.emit(events.REQUESTQUESTION);
        }

    }

    //When loading is complete
    onStart = () => {
        this.setState({ view: VIEWS.QUESTION })
    }

    componentWillUnmount = () => {
        socket.emit('disconnect');
    }

    //For the next question
    onNext = () => {
        if ((this.state.currentQuestion === NUMBER_OF_QUESTIONS - 1)) {
            this.setState({
                view: VIEWS.RESULT
            })
        } else {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
        }
    }

    onChangeName = (name) => {
        this.setState({ name })
    }

    render() {

        let { view, questions, loadingProgress, currentQuestion, name, gameId } = this.state;

        switch (view) {
            case VIEWS.START:
                return (
                    <StartPage onStart={this.onStartLoading} name={name} onChangeName={this.onChangeName} />
                );
            case VIEWS.LOADING:
                return (
                    <Loading progress={loadingProgress} onStart={this.onStart} />
                )
            case VIEWS.QUESTION:
                return (
                    <Question gameId={gameId} question={questions[currentQuestion]} number={currentQuestion + 1} next={this.onNext} />
                );
            case VIEWS.RESULT:
                return (
                    <Result gameId={gameId} onStart={this.restartGame} name={name} />

                );
            default: return null;
        }


    }

}
export default QuizMaster;