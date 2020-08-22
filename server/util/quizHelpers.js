const marvel = require('../api/marvel')
const questions = require('../api/questions');
const games = require('../api/games');
const { child } = require('../api/questions');

const getRandomOptions = (characters) => {
    let nameList = []

    let randomNum1 = Math.floor((Math.random() * characters.length));
    nameList.push(characters[randomNum1].name)

    characters.splice(randomNum1, 1);

    let randomNum2 = Math.floor((Math.random() * characters.length));
    nameList.push(characters[randomNum2].name)
    characters.splice(randomNum2, 1);

    let randomNum3 = Math.floor((Math.random() * characters.length));
    nameList.push(characters[randomNum3].name)
    characters.splice(randomNum3, 1);

    let randomNum4 = Math.floor((Math.random() * characters.length));
    nameList.push(characters[randomNum4].name)
    characters.splice(randomNum4, 1);

    return nameList;
}

const getImageUrl = (item) => {
    if (!item.thumbnail) return null;
    let imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`
    imageUrl = imageUrl.replace('http', 'https');
    return imageUrl;
}

const shuffleOptions = (options) => {
    let currentIndex = options.length, temp, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temp = options[currentIndex];
        options[currentIndex] = options[randomIndex];
        options[randomIndex] = temp;
    }

    return options;
}

exports.createQuestion = async () => {
    try {
        let result = {};
        let imageUrl = '', characters = [], character = {};
        let tries = 10;
        //Get a random character
        do {
            let randomOffset = Math.floor((Math.random() * 162) + 1); // 162 is the max number of characters for events 29,253
            let response = await marvel.get('characters', { params: { events: '29,253,238,240,321,297', offset: randomOffset } })

            characters = response.data.data.results;
            if (characters && characters.length != 0) {
                character = characters[0];
                imageUrl = getImageUrl(character);
            }
            if (!tries--) {
                throw "Unable to Fetch Question"
            }
        } while (!characters || !imageUrl || imageUrl.includes('image_not_available') || characters.length < 5)

        result.imageUrl = imageUrl;

        //Remove the correct answer and get Options(choices) for the question
        characters.splice(0, 1);
        let options = getRandomOptions(characters);
        options.push(character.name); //Add the correct answer to the options

        //Shuffle the options
        options = shuffleOptions(options);
        result.options = options;

        //Create a Question and save to firebase
        let question = questions.push();
        let questionId = (await question).key;
        (await question).set({ answer: character.name })
        result.questionId = questionId; //send question id

        return result
    } catch (error) {
        throw error;
    }
}

exports.deleteQuestion = (questionId) => {
    return questions.child(questionId).remove()
}

exports.checkAnswer = (questionId, answer) => {
    return questions.child(questionId).once("value").then((snapshot) => {
        let correctAnswer = snapshot.val().answer;
        return correctAnswer === answer;
    })
}

//creates a new game and returns gameid
exports.createNewGame = async (personName) => {
    let game = games.push();
    let gameId = (await game).key;
    (await game).set({ name: personName, score: 0, correctAnswers: 0, wrongAnswers: 0 })
    return gameId;
}

exports.updateGameScore = async (gameId, isCorrect) => {
    let game = await this.getGame(gameId);
    let existingScore = game.score;
    let correct = game.correctAnswers;
    let wrong = game.wrongAnswers;
    if (isCorrect) {
        correct++;
    } else {
        wrong++;
    }
    let newScore = existingScore + ((isCorrect) ? 10 : -5);
    games.child(gameId).update({
        score: newScore,
        correctAnswers: correct,
        wrongAnswers: wrong
    })
}

//Returns game score of the game
exports.getGameScore = async (gameId) => {
    let game = (await games.child(gameId).once('value')).val();
    let score = game.score;
    return score;
}

//Returns Game details
exports.getGame = async (gameId) => {
    let game = (await games.child(gameId).once('value')).val();
    return game;
}

//Returns highscores
exports.getHighScores = async () => {
    //firebase realtime database doesnt support ordering by descending order, hence limitToLast is used instead of limitToFirst
    let snapshot = (await games.orderByChild("score").limitToLast(10).once("value"));
    let scores = [];
    snapshot.forEach(snap => { scores.push(snap.val()) });
    return scores;
}
this.getHighScores();