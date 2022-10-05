const openHumburgerElement = document.querySelector(".humburger");
openHumburgerElement.addEventListener("click", () => {
    openNavigationMenu();
});


const openNavigationMenu = () => {
    const humburgerBtnElement = document.querySelector(".humburger");
    humburgerBtnElement.classList.toggle("humburger-active");

    const wrapperMenuNavBurger = document.querySelector(".wrapper-menu-nav-burger");
    wrapperMenuNavBurger.classList.toggle("wrapper-menu-nav-burger-active");


    const headerNavElement = document.querySelector(".menu-nav-burger");
    headerNavElement.classList.toggle("menu-nav-burger-active");

    const humburgerLineElement = document.querySelectorAll(".humburger-line");
    humburgerLineElement.forEach(element => element.classList.toggle("humburger-line-active"));
}

const closeShadowElement = document.querySelector(".wrapper-menu-nav-burger");
closeShadowElement.addEventListener("click", (e) => {
    const menuNavBurger = document.querySelector(".menu-nav-burger");
    if (e.target !== menuNavBurger) {
        closeNavigationMenu();
    }
});

const closeNavigationMenu = () => {
    const wrapperMenuNavBurger = document.querySelector(".wrapper-menu-nav-burger-active");
    wrapperMenuNavBurger.classList.remove("wrapper-menu-nav-burger-active");

    const humburgerBtnElement = document.querySelector(".humburger-active");
    humburgerBtnElement.classList.remove("humburger-active");

    const headerNavElement = document.querySelector(".menu-nav-burger-active");
    headerNavElement.classList.remove("menu-nav-burger-active");

    const humburgerLineElement = document.querySelectorAll(".humburger-line-active");
    humburgerLineElement.forEach(element => element.classList.remove("humburger-line-active"));
}


// const scrollVectorLeft = document.querySelector(".wrapper-vector-left");
// scrollVectorLeft.addEventListener("click", () => {
//     //  getRandomImg();
// });

// function getRandomImg() {

// }