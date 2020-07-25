const { getQuestion } = require("../util/quizHelpers");

module.exports = (socket) => {
    console.log("user connected");

    //Send a message after a timeout of 4seconds
    setTimeout(function () {
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);

    socket.on('question', async () => {

    });

    socket.on('requestQuestion', async () => {
        let question = await getQuestion();
        socket.emit('question', question);
    });


    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
}