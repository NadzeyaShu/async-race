import birdsData from '../birds.js';

let level = 0;
let levelData = birdsData[level];
console.log(levelData);
let correctAnswer = {};
let incorrectAnswerCounter = 0;

const listAnswerOptions = document.querySelector(".list__answer-options");
const questionAudioControl = document.querySelector(".audio-question-track");
const btnNextQuestion = document.querySelector(".btn__next-question-inactive");

const titleStartGame = document.querySelector(".title-start-game");
const wrapperAboutBird = document.querySelector(".wrapper__about-bird");

loadGame();

function loadGame() {
    saveCorrectAnswer();
    //set question sound from correct answer
    createAnswerOptionsBlock();
    setQuestionAudio();
}

function createAnswerOptionsBlock() {
    for (let i = 0; i < levelData.length; i++) {
        let answer = levelData[i];

        let answerElement = document.createElement('li');
        answerElement.classList.add('list-item');
        answerElement.setAttribute('data-id', answer.id);

        let spanDot = document.createElement('span');
        spanDot.classList.add('li-dot');
        answerElement.appendChild(spanDot);

        let spanAnswerText = document.createElement('span');
        spanAnswerText.textContent = answer.name;
        answerElement.appendChild(spanAnswerText);

        listAnswerOptions.append(answerElement);

        answerElement.addEventListener('click', (event) => clickOnAnswer(answerElement));

    }
}

function clickOnAnswer(answerElement) {
    let answerId = +answerElement.getAttribute('data-id');
    let spanDot = answerElement.querySelector('.li-dot');

    if (answerId !== correctAnswer.id) {
        spanDot.classList.add('error');
        incorrectAnswerCounter += incorrectAnswerCounter;
        //todo add sound for error
    } else {
        spanDot.classList.add('success');
        btnNextQuestion.classList.add("btn__next-question-active");

        // todo add class for section questions
        //todo add sound for success
    }
}

function saveCorrectAnswer() {
    let answerId = getRandomInt(1, 6);
    correctAnswer = levelData.find(arrElement => arrElement.id === answerId);
    console.log(correctAnswer);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setQuestionAudio() {
    questionAudioControl.innerHTML = '';
    let htmlSourceElement = document.createElement("source");
    htmlSourceElement.src = correctAnswer.audio;
    questionAudioControl.append(htmlSourceElement);


}


// 2. поменять стили в блоке описания
// 3. проверка клик на айтем, если айди = айди.аудио
// -если нет, менять стили на красный + звук
// -если да:
//     менять стиль цвета на зеленый,
//     менять стиль у следующий уровень
//     заменить **** на название птицы
//     звук