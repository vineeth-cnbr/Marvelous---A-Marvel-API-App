const { createQuestion, checkAnswer, deleteQuestion, createNewGame, updateGameScore } = require("../util/quizHelpers");
const events = require("./events");
const games = require("../api/games");

module.exports = (socket) => {
    console.log("New user connected");

    //When client starts a quiz
    socket.on(events.STARTGAME, async (name) => {
        let gameId = await createNewGame(name);
        socket.emit(events.GAME, gameId);
    })

    //when client requests a question
    socket.on(events.REQUESTQUESTION, async () => {
        let question = await createQuestion();
        socket.emit(events.QUESTION, question);
    });

    //When client checks for answer
    socket.on(events.ANSWER, async ({ gameId, questionId, answer }) => {
        try {
            let isCorrect = await checkAnswer(questionId, answer);
            await updateGameScore(gameId, isCorrect)
            socket.emit(events.RESULT);
            deleteQuestion(questionId).catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })

    //When client disconnects
    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    //push high scores when updated
    //firebase realtime database doesnt support ordering by descending order, hence limitToLast is used instead of limitToFirst
    games.orderByChild("score").limitToLast(10).on("child_added", (snapshot) => {
        let scores = snapshot.val();
        socket.emit(events.HIGHSCORES, scores);
    })


}