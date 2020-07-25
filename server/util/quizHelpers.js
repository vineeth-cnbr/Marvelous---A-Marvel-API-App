const marvel = require('../api/marvel')
const questions = require('../api/questions');

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

exports.getQuestion = async () => {
    try {
        let result = {};
        let imageUrl = '', characters = [], character = {};
        //Get a random character
        do {
            let randomOffset = Math.floor((Math.random() * 57) + 1); // 57 is the max number of characters for events 29,253
            let response = await marvel.get('characters', { params: { events: '29, 253', offset: randomOffset } })
            characters = response.data.data.results;
            character = characters[0];
            imageUrl = getImageUrl(character);
        } while (imageUrl.includes('image_not_available') || characters.length < 5)

        result.imageUrl = imageUrl;

        //Remove the correct answer and get Options(choices) for the question
        characters.splice(0, 1);
        let options = getRandomOptions(characters);
        options.push(character.name); //Add the correct answer to the options

        //Shuffle the options
        options = shuffleOptions(options);
        result.options = options;

        //Create a Question
        let question = questions.push();
        let questionId = (await question).key;
        result.questionId = questionId;

        //send question id
        console.log(result);
        return result
    } catch (error) {
        console.log(error)
        throw error;
    }
}