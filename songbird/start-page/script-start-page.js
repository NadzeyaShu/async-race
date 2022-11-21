import i18n_EN from "../i18n/En.js";
import i18n_RU from "../i18n/Ru.js";

let langSelect = document.querySelector(".langSelect");
let headerMenuItemBtnStartPage = document.querySelector(".js_game_page_header_menu_nav_start_page");
let headerMenuItemBtnGamePage = document.querySelector(".js_game_page_header_menu_nav_game_page");
let mainContainerTitle = document.querySelector(".js_main-container__title");
let mainContainerDescription = document.querySelector(".js_main-container__description");
let mainContainerSpecification = document.querySelector(".js_main-container__specification");
let mainContainerUseGallery = document.querySelector(".js_main-container__use-gallery");
let galleryLink = document.querySelector(".js_gallery-link");


langSelect.addEventListener("change", evt => onChangeLang(evt.target.value));

onChangeLang(getCurrentLang());

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
    mainContainerTitle.textContent = i18n.main_container_title;
    mainContainerDescription.textContent = i18n.main_container_description;
    mainContainerSpecification.textContent = i18n.main_container_specification;
    mainContainerUseGallery.textContent = i18n.main_container_useGallery;
    galleryLink.textContent = i18n.gallery_link;
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