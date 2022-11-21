import i18n_EN from "../i18n/En.js";
import i18n_RU from "../i18n/Ru.js";

const MAX_SCORE = 30;
const mainContainer = document.querySelector(".main-container");

let langSelect = document.querySelector(".langSelect");
let headerMenuItemBtnStartPage = document.querySelector(".js_game_page_header_menu_nav_start_page");
let headerMenuItemBtnGamePage = document.querySelector(".js_game_page_header_menu_nav_game_page");

langSelect.addEventListener("change", evt => onChangeLang(evt.target.value));


createMainContainerByScore();

onChangeLang(getCurrentLang());

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

    let wrapperCongrats = document.createElement("div");
    wrapperCongrats.classList.add("wrapper-congrats");

    let firstPartCongrats = document.createElement("span");
    firstPartCongrats.classList.add("js-first-part-congrats");
    firstPartCongrats.textContent = "Поздравляем! Вы прошли викторину и набрали "

    let secondPartCongrats = document.createElement("span");
    secondPartCongrats.textContent = score;

    let thirdPartCongrats = document.createElement("span");
    thirdPartCongrats.classList.add("js-third-part-congrats");
    thirdPartCongrats.textContent = " из 30 возможных баллов!"

    let form = document.createElement("form");
    form.action = "../game-page/game-page.html";

    let wrapperCongratsBtn = document.createElement("button");
    wrapperCongratsBtn.classList.add("wrapper-congrats__btn");
    wrapperCongratsBtn.classList.add("js-wrapper-congrats__btn");
    wrapperCongratsBtn.textContent = "попробовать еще раз!";

    form.append(wrapperCongratsBtn);
    wrapperCongrats.append(firstPartCongrats);
    wrapperCongrats.append(secondPartCongrats);
    wrapperCongrats.append(thirdPartCongrats);
    wrapperCongrats.append(form);
    mainContainer.append(wrapperCongrats);
}

function createWrapperCongratsMaxScore() {
    const wrapperCongratsMaxScore = document.createElement("div");
    wrapperCongratsMaxScore.classList.add("wrapper-congrats-max-score");
    wrapperCongratsMaxScore.classList.add("js-wrapper-congrats-max-score");
    wrapperCongratsMaxScore.textContent = "Игра окончена!";

    mainContainer.append(wrapperCongratsMaxScore);
}

function onChangeLang(lang) {
    localStorage.setItem('lang', lang);
    let i18n = getI18n(lang);
    if (lang === 'en') {
        langSelect.getElementsByTagName('option')[1].selected = true;
    } else {
        langSelect.getElementsByTagName('option')[0].selected = true;
    }
    translateToEnglish(i18n)
}

function getCurrentLang() {
    let lang = localStorage.getItem("lang");
    if (!lang) {
        lang = 'ru';
    }
    return lang;
}

function translateToEnglish(i18n) {

    let wrapperCongratsBtn = document.querySelector(".js-wrapper-congrats__btn");
    let wrapperCongratsMaxScore = document.querySelector(".js-wrapper-congrats-max-score");
    let firstPartCongrats = document.querySelector(".js-first-part-congrats");
    let thirdPartCongrats = document.querySelector(".js-third-part-congrats");

    headerMenuItemBtnStartPage.textContent = i18n.game_page_header_menu_nav_start_page;
    headerMenuItemBtnGamePage.textContent = i18n.game_page_header_menu_nav_game_page;
    firstPartCongrats.textContent = i18n.firstPartCongrats;
    thirdPartCongrats.textContent = i18n.thirdPartCongrats;
    wrapperCongratsBtn.textContent = i18n.wrapper_congrats_btn;
    wrapperCongratsMaxScore.textContent = i18n.wrapper_congrats_max_score;
}

function getMessage(key) {
    let currentLang = getCurrentLang();
    let i18n = getI18n(currentLang);
    return i18n[key];
}

function getI18n(lang) {
    let i18n;
    if (lang === 'en') {
        i18n = i18n_EN;
    } else {
        i18n = i18n_RU;
    }
    return i18n;
}

