import birdsData from '../birds.js';

let level = 0;
let levelData = [];

let correctAnswer = {};
let incorrectAnswerCounter = 0;

const nextQuestionBtnWrapper = document.querySelector(".wrapper__next-question-btn");
const listAnswerOptions = document.querySelector(".list__answer-options");

const wrapperQuestions = document.querySelector(".wrapper-questions");
const blockAboutListItem = document.querySelector(".block__about-list-item");

loadLevel();

function loadLevel() {
    levelData = birdsData[level];
    console.log(levelData);
    selectCorrectAnswer();
    recreateAnswerOptionsBlock();
    recreateQuestionBlock();
    recreateDefaultAnswerDetailsBlock();
    recreateNextLevelButton()
}

function clickOnAnswer(answerElement) {
    let answerId = +answerElement.getAttribute('data-id');

    let answerData = getAnswerById(answerId);
    recreateAnswerDetailsBlock(answerData);

    if (answerId !== correctAnswer.id) {
        processWrongAnswer(answerElement);
    } else {
        processRightAnswer(answerElement);
    }
}

function processWrongAnswer(answerElement) {
    let spanDot = answerElement.querySelector('.li-dot');
    spanDot.classList.add('error');

    incorrectAnswerCounter += 1;
    //todo add sound for error
}

function processRightAnswer(answerElement) {
    let spanDot = answerElement.querySelector('.li-dot');
    spanDot.classList.add('success');

    let btnNextQuestion = document.querySelector(".btn__next-question-inactive");
    btnNextQuestion.classList.add("btn__next-question-active");

    let questionsImg = document.querySelector('.questions__img');
    questionsImg.src = correctAnswer.image;

    let hideName = document.querySelector(".hide-name");
    hideName.textContent = correctAnswer.name;
    // todo add class for section questions
    //todo add sound for success
}

function recreateNextLevelButton() {
    nextQuestionBtnWrapper.innerHTML = '';
    createNextLevelButton();
}

function createNextLevelButton() {
    let nextLevelButton = document.createElement('button');
    nextLevelButton.classList.add('btn__next-question-inactive');
    nextLevelButton.textContent = 'Следующий вопрос';
    nextQuestionBtnWrapper.append(nextLevelButton);

    nextLevelButton.addEventListener("click", ev => selectNextLevel())
}

function recreateQuestionBlock() {
    wrapperQuestions.innerHTML = '';
    createQuestionBlock();
}

function createQuestionBlock() {
    let wrapperQuestionsImg = document.createElement('div');
    wrapperQuestionsImg.classList.add('wrapper-questions__img');

    let questionsImg = document.createElement('img')
    questionsImg.classList.add('questions__img');
    questionsImg.src = "../assets/bird.png";

    wrapperQuestionsImg.append(questionsImg);

    let wrapperAboutHideName = document.createElement("div");
    wrapperAboutHideName.classList.add("wrapper__about-hide-name");

    let hideName = document.createElement("div");
    hideName.classList.add("hide-name");
    hideName.textContent = "******";
    wrapperAboutHideName.append(hideName);

    let playerControls = document.createElement("div");
    playerControls.classList.add("player-controls");

    let audio = document.createElement("audio");
    audio.classList.add("audio-question-track");
    audio.controls = true;
    audio.innerHTML = '';

    let htmlSourceElement = document.createElement("source");
    htmlSourceElement.src = correctAnswer.audio;
    audio.append(htmlSourceElement);

    playerControls.append(audio);
    wrapperAboutHideName.append(playerControls);

    wrapperQuestions.append(wrapperQuestionsImg);
    wrapperQuestions.append(wrapperAboutHideName);
}

function recreateDefaultAnswerDetailsBlock() {
    clearAnswerDetailsBlock();
    createDefaultAnswerDetailsBlock();
}

function createDefaultAnswerDetailsBlock() {
    let titleStartGame = document.createElement("div");
    titleStartGame.classList.add("title-start-game");
    titleStartGame.textContent = "Послушайте плеер. Выберите птицу из списка";
    blockAboutListItem.append(titleStartGame);
}

function recreateAnswerDetailsBlock(answerData) {
    clearAnswerDetailsBlock();
    createAnswerDetailsBlock(answerData)
}

function clearAnswerDetailsBlock() {
    blockAboutListItem.innerHTML = '';
}

function createAnswerDetailsBlock(answerData) {
    createAboutBird(answerData);
    createGeneralDescription(answerData);
}

function createAboutBird(answerData) {
    let wrapperAboutBird = document.createElement("div");
    wrapperAboutBird.classList.add("wrapper__about-bird");

    let wrapperAboutBirdImg = getAboutBirdImgElement(answerData);
    wrapperAboutBird.append(wrapperAboutBirdImg);

    let descriptionBird = getBirdDescriptionElement(answerData);
    wrapperAboutBird.append(descriptionBird);

    blockAboutListItem.append(wrapperAboutBird);
}

function getBirdDescriptionElement(answerData) {
    let descriptionBird = document.createElement("div");
    descriptionBird.classList.add("description-bird");

    let wrapperBirdName = getBirdNameElement(answerData);
    descriptionBird.append(wrapperBirdName);

    let playerControls = getBirdDescriptionAudioElement(answerData)
    descriptionBird.append(playerControls);

    return descriptionBird;
}

function getBirdDescriptionAudioElement(answerData) {
    let playerControls = document.createElement("div");
    playerControls.classList.add("player-controls");

    let audio = document.createElement("audio");
    audio.controls = true;
    let htmlSourceElement = document.createElement("source");
    htmlSourceElement.src = answerData.audio;
    audio.append(htmlSourceElement);
    playerControls.append(audio);
    return playerControls;
}

function getBirdNameElement(answerData) {
    let wrapperBirdName = document.createElement("div");
    wrapperBirdName.classList.add("wrapper-bird-name");

    let birdName = document.createElement("div");
    birdName.classList.add("bird-name");
    birdName.textContent = answerData.name;
    wrapperBirdName.append(birdName);

    let birdLatinName = document.createElement("div");
    birdLatinName.classList.add("bird-latin-name");
    birdLatinName.textContent = answerData.species;
    wrapperBirdName.append(birdLatinName);
    return wrapperBirdName;
}

function getAboutBirdImgElement(answerData) {
    let wrapperAboutBirdImg = document.createElement("div");
    wrapperAboutBirdImg.classList.add("wrapper__about-bird-img");
    let blockAboutImg = document.createElement("img");
    blockAboutImg.classList.add("block-about-img");
    blockAboutImg.src = answerData.image;
    wrapperAboutBirdImg.append(blockAboutImg);
    return wrapperAboutBirdImg;
}

function createGeneralDescription(answerData) {
    let generalDescription = document.createElement("div");
    generalDescription.classList.add("general-description");
    generalDescription.textContent = answerData.description;
    blockAboutListItem.append(generalDescription);
}

function recreateAnswerOptionsBlock() {
    listAnswerOptions.innerHTML = '';
    createAnswerOptionsBlock();
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

function getAnswerById(answerId) {
    return levelData.find(value => value.id === answerId);
}

function selectCorrectAnswer() {
    let answerId = getRandomInt(1, 6);
    correctAnswer = levelData.find(arrElement => arrElement.id === answerId);
    console.log(correctAnswer);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectNextLevel() {
    //todo проверка на конец уровня(btn__next-question-active) и изменить полоса видов птиц
    level += 1;
    loadLevel();
}