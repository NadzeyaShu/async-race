import birdsData from '../birds.js';
import i18n_EN from "../i18n/En.js";
import i18n_RU from "../i18n/Ru.js";

const blockAboutListItem = document.querySelector(".block__about-list-item");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let langSelect = document.querySelector(".langSelect");
let headerMenuItemBtnStartPage = document.querySelector(".js_game_page_header_menu_nav_start_page");
let headerMenuItemBtnGamePage = document.querySelector(".js_game_page_header_menu_nav_game_page");

langSelect.addEventListener("change", evt => onChangeLang(evt.target.value));

let birdsArr = createBirdsArr();

let sliderStep = 0;

nextBtn.addEventListener("click", pushNextBtn);
prevBtn.addEventListener("click", pushPrevBtn);
getBirdsElement();
pushNextBtn();
pushPrevBtn();

onChangeLang(getCurrentLang());

function createBirdsArr() {
    return birdsData.flatMap(x => x);
}

function getBirdsElement() {
    for (let i = 0; i < birdsArr.length; i++) {
        let birdsElement = birdsArr[i];

        createGeneralBlockBird(birdsElement);
    }
}

function createAboutBird(birdsElement) {
    let wrapperAboutBird = document.createElement("div");
    wrapperAboutBird.classList.add("wrapper__about-bird");

    let wrapperAboutBirdImg = getAboutBirdImgElement(birdsElement);
    wrapperAboutBird.append(wrapperAboutBirdImg);

    let descriptionBird = getBirdDescriptionElement(birdsElement);
    wrapperAboutBird.append(descriptionBird);

    return wrapperAboutBird;
}

function getBirdDescriptionElement(birdsElement) {
    let descriptionBird = document.createElement("div");
    descriptionBird.classList.add("description-bird");

    let wrapperBirdName = getBirdNameElement(birdsElement);
    descriptionBird.append(wrapperBirdName);

    let playerControls = getBirdDescriptionAudioElement(birdsElement)
    descriptionBird.append(playerControls);

    return descriptionBird;
}

function getBirdDescriptionAudioElement(birdsElement) {
    let playerControls = document.createElement("div");
    playerControls.classList.add("player-controls");

    let audio = document.createElement("audio");
    audio.controls = true;
    let htmlSourceElement = document.createElement("source");
    htmlSourceElement.src = birdsElement.audio;
    audio.append(htmlSourceElement);
    playerControls.append(audio);
    return playerControls;
}

function getBirdNameElement(birdsElement) {
    let wrapperBirdName = document.createElement("div");
    wrapperBirdName.classList.add("wrapper-bird-name");

    let birdName = document.createElement("div");
    birdName.classList.add("bird-name");
    birdName.textContent = birdsElement.name;
    wrapperBirdName.append(birdName);

    let birdLatinName = document.createElement("div");
    birdLatinName.classList.add("bird-latin-name");
    birdLatinName.textContent = birdsElement.species;
    wrapperBirdName.append(birdLatinName);
    return wrapperBirdName;
}

function getAboutBirdImgElement(birdsElement) {
    let wrapperAboutBirdImg = document.createElement("div");
    wrapperAboutBirdImg.classList.add("wrapper__about-bird-img");
    let blockAboutImg = document.createElement("img");
    blockAboutImg.classList.add("block-about-img");
    blockAboutImg.src = birdsElement.image;
    wrapperAboutBirdImg.append(blockAboutImg);
    return wrapperAboutBirdImg;
}

function createGeneralDescription(birdsElement) {
    let generalDescription = document.createElement("div");
    generalDescription.classList.add("general-description");
    generalDescription.textContent = birdsElement.description;

    return generalDescription;
}

function createGeneralBlockBird(birdsElement) {
    let wrapperGeneralBlockBird = document.createElement("div");
    wrapperGeneralBlockBird.classList.add("wrapper__general-block-bird")

    let generalDescription = createGeneralDescription(birdsElement);
    let wrapperAboutBird = createAboutBird(birdsElement);

    wrapperGeneralBlockBird.append(wrapperAboutBird);
    wrapperGeneralBlockBird.append(generalDescription);

    blockAboutListItem.append(wrapperGeneralBlockBird);
}

function pushNextBtn() {
    if (document.documentElement.clientWidth > 1160) {
        if (sliderStep < birdsArr.length - 1) {
            sliderStep += 1;
            let translateX = -100 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 750) {
        if (sliderStep < birdsArr.length - 1) {
            sliderStep += 1;
            let translateX = -114.2 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 600) {
        if (sliderStep < birdsArr.length - 1) {
            sliderStep += 1;
            let translateX = -109.1 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 420) {
        if (sliderStep < birdsArr.length - 1) {
            sliderStep += 1;
            let translateX = -113.5 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth < 420) {
        if (sliderStep < birdsArr.length - 1) {
            sliderStep += 1;
            let translateX = -114.3 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    }
}

function pushPrevBtn() {
    if (document.documentElement.clientWidth > 1160) {
        if (sliderStep > 0) {
            sliderStep -= 1;
            let translateX = -100 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 750) {
        if (sliderStep > 0) {
            sliderStep -= 1;
            let translateX = -114.2 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 600) {
        if (sliderStep > 0) {
            sliderStep -= 1;
            let translateX = -109.1 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth > 420) {
        if (sliderStep > 0) {
            sliderStep -= 1;
            let translateX = -113.5 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    } else if (document.documentElement.clientWidth < 420) {
        if (sliderStep > 0) {
            sliderStep -= 1;
            let translateX = -114.3 * sliderStep;
            blockAboutListItem.style.transform = 'translateX(' + translateX + '%)';
        }
    }
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

    headerMenuItemBtnStartPage.textContent = i18n.game_page_header_menu_nav_start_page;
    headerMenuItemBtnGamePage.textContent = i18n.game_page_header_menu_nav_game_page;

    nextBtn.value = i18n.next_btn;
    prevBtn.value = i18n.prev_btn;
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
