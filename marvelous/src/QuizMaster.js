import React, { Component } from 'react';
import StartPage from './StartPage';
import Question from './Question';
import Result from './Result';
import Loading from './Loading';
import { socket } from '../../apis/sockets';
import { VIEWS, NUMBER_OF_QUESTIONS } from '../../constants'
import events from '../../../../server/sockets/events';

class QuizMaster extends Component {

    state = {
        view: VIEWS.START,
        questions: [],
        currentQuestion: 0,
        loadingProgress: 0,
        points: 0,
        name: 'vineeth'
    }

    constructor(props) {
        super(props);
        socket.on(events.QUESTION, this.addQuestion);
    }

    //updates the state to add a question, doesnt return anything
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

    //For the next question
    onNext = (answer) => {
        console.log("onNext");
        let points = this.state.points;
        //If the user has not passed
        if (answer !== null) {
            //If answer is correct
            if (answer) {
                points += 10;
            } else {
                points -= 5;
            }
            this.setState({
                points
            }, () => {
                console.log("update", points)
            });
        }

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

        let { view, questions, loadingProgress, currentQuestion, points, name } = this.state;
        console.log("name", name);
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
                    <Question question={questions[currentQuestion]} number={currentQuestion + 1} next={this.onNext} />
                );
            case VIEWS.RESULT:
                return (
                    <Result points={points} onStart={this.onStartLoading} name={name} />

                );
            default: return null;
        }


    }

}
export default QuizMaster;