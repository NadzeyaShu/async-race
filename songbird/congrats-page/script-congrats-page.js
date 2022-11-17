const mainContainer = document.querySelector(".main-container");
const MAX_SCORE = 30;

createMainContainerByScore();

function getFinalScore() {
    let score = localStorage.getItem("score");
    return +score;
}

function createMainContainerByScore() {
    let score = getFinalScore();

    if (score < MAX_SCORE) {
        createWrapperCongrats(score);
    } else {
        createWrapperCongratsMaxScore();
    }
}

function createWrapperCongrats(score) {

    const wrapperCongrats = document.createElement("div");
    wrapperCongrats.classList.add("wrapper-congrats");
    wrapperCongrats.textContent = `Поздравляем! Вы прошли викторину и набрали ${score} из 30 возможных баллов!`;

    const form = document.createElement("form");
    form.action = "../game-page/game-page.html";

    const wrapperCongratsBtn = document.createElement("button");
    wrapperCongratsBtn.classList.add("wrapper-congrats__btn");
    wrapperCongratsBtn.textContent = "попробовать еще раз!";

    form.append(wrapperCongratsBtn);
    wrapperCongrats.append(form);
    mainContainer.append(wrapperCongrats);
}

function createWrapperCongratsMaxScore() {
    const wrapperCongratsMaxScore = document.createElement("div");
    wrapperCongratsMaxScore.classList.add("wrapper-congrats-max-score");
    wrapperCongratsMaxScore.textContent = " Игра окончена!";

    mainContainer.append(wrapperCongratsMaxScore);
}

