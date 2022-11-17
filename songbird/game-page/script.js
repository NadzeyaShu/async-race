import birdsData from '../birds.js';

const MAX_LEVEL = 5;

let level = 0;
let levelData = [];
let isLevelComplete = false;
let score = 0;

let correctAnswer = {};
let incorrectAnswerCounter = 0;

const nextQuestionBtnWrapper = document.querySelector(".wrapper__next-question-btn");
const listAnswerOptions = document.querySelector(".list__answer-options");

const wrapperQuestions = document.querySelector(".wrapper-questions");
const blockAboutListItem = document.querySelector(".block__about-list-item");

let sectionQuestionsItem = document.querySelectorAll(".wrapper__section-questions__item");

let scoreBlock = document.querySelector(".score");

loadLevel();

function loadLevel() {
    levelData = birdsData[level];
    console.log(levelData);
    selectCorrectAnswer();
    recreateAnswerOptionsBlock();
    recreateQuestionBlock();
    recreateDefaultAnswerDetailsBlock();
    recreateNextLevelButton();
}

function selectNextLevel() {
    if (isLevelComplete && level < MAX_LEVEL) {
        level += 1;
        isLevelComplete = false;
        incorrectAnswerCounter = 0;
        loadLevel();
        showCurrentQuestion();
    }
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

function scoreCounter() {
    if (incorrectAnswerCounter === 0) {
        score = score + 5;
    } else if (incorrectAnswerCounter === 1) {
        score = score + 4;
    } else if (incorrectAnswerCounter === 2) {
        score = score + 3;
    } else if (incorrectAnswerCounter === 3) {
        score = score + 2;
    } else if (incorrectAnswerCounter === 4) {
        score = score + 1;
    } else {
        score = score + 0;
    }
}

function processWrongAnswer(answerElement) {
    if (!isLevelComplete) {
        let spanDot = answerElement.querySelector('.li-dot');
        spanDot.classList.add('error');
        incorrectAnswerCounter += 1;

        playErrorSound();
    }
}

function processRightAnswer(answerElement) {
    if (!isLevelComplete) {
        isLevelComplete = true;
        scoreCounter();

        if (level === MAX_LEVEL) {
            saveFinalScore();
            window.location.replace('../congrats-page/congrats-page.html');
        } else {
            let spanDot = answerElement.querySelector('.li-dot');
            spanDot.classList.add('success');

            let btnNextQuestion = document.querySelector(".btn__next-question-inactive");
            btnNextQuestion.classList.add("btn__next-question-active");

            let questionsImg = document.querySelector('.questions__img');
            questionsImg.src = correctAnswer.image;

            let hideName = document.querySelector(".hide-name");
            hideName.textContent = correctAnswer.name;

            playSuccessSound();

            scoreBlock.textContent = score;
        }
    }
}

function playSuccessSound() {
    const audioSignal = new Audio();
    audioSignal.src = '../assets/sound/success.mp3';
    audioSignal.play();
}

function playErrorSound() {
    const audioSignal = new Audio();
    audioSignal.src = '../assets/sound/error.mp3';
    audioSignal.play();
}

function showCurrentQuestion() {
    let sectionQuestionsItemArray = Array.from(sectionQuestionsItem);

    let currentLevelElement = sectionQuestionsItemArray.find(element => +element.getAttribute('data-level') === level);
    currentLevelElement.classList.add("wrapper__section-questions__item__active");

    let previousLevelElement = sectionQuestionsItemArray.find(element => +element.getAttribute('data-level') === level - 1);
    previousLevelElement.classList.remove("wrapper__section-questions__item__active");
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
    playerControls.classList.add("player-controls-mini");

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

function saveFinalScore() {
    localStorage.setItem("score", score);
}