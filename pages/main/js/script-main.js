import animals from '../js/animals.js';
import testimonials from '../js/testomonial.js';

const PET_BLOCKS_SIZE = 6;
const openHumburgerElement = document.querySelector(".humburger");
const closeShadowElement = document.querySelector(".wrapper-menu-nav-burger");
const petsWrapper = document.querySelector(".wrapper-pets");
const wrapperVectorLeft = document.querySelector('.wrapper-vector-left');
const wrapperVectorRight = document.querySelector('.wrapper-vector-right');
const wrapperTestimonialsAll = document.querySelector('.wrapper-testimonials-all');



openHumburgerElement.addEventListener("click", () => {
    openNavigationMenu();
});

closeShadowElement.addEventListener("click", (e) => {
    const menuNavBurger = document.querySelector(".menu-nav-burger");
    if (e.target !== menuNavBurger) {
        closeNavigationMenu();
    }
});


createPetsBocks();
createWrapperTestimonials()

wrapperVectorLeft.addEventListener("click", (array) => {
    createRandomAnimalsArray();
    createPetsBocks();
})

wrapperVectorRight.addEventListener("click", (array) => {
    createRandomAnimalsArray();
    createPetsBocks();
})



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

function createPetsBocks() {
    const animalsArray = createRandomAnimalsArray();
    for (let index = 0; index < animalsArray.length; index++) {
        let animal = animalsArray[index];
        const petBlock = document.createElement("div");
        petBlock.classList.add('pet-block');
        if (index > 3) {
            petBlock.classList.add('pets-block-640');
        }
        const imgPetsWrapper = createImgPetsWrapper(animal);
        petBlock.append(imgPetsWrapper);
        const petDescription = createPetDescription(animal);
        petBlock.append(petDescription);
        petsWrapper.append(petBlock);
    }
}

function createRandomAnimalsArray() {
    let animalsClone = [...animals]
    shuffleArray(animalsClone);
    return animalsClone.slice(0, PET_BLOCKS_SIZE);
}

function createImgPetsWrapper(animal) {
    let imgPetsWrapper = document.createElement("div");
    imgPetsWrapper.classList.add('wrapper-img-pets');

    let imgPet = document.createElement("img");
    imgPet.classList.add('img-pets');
    imgPet.src = animal.image;
    imgPet.alt = animal.name;

    imgPetsWrapper.append(imgPet);
    return imgPetsWrapper;
}

function createPetDescription(animal) {
    let petDescription = document.createElement("div");
    petDescription.classList.add('description-pets');

    let titlePets = document.createElement('div');
    titlePets.classList.add('title-pets');
    titlePets.textContent = animal.name;
    petDescription.append(titlePets);

    let petHabitat = document.createElement('div');
    petHabitat.classList.add('habitat-pet');
    petHabitat.textContent = animal.location;
    petDescription.append(petHabitat);

    let dietPets = document.createElement('div');
    dietPets.classList.add('diet-pets');
    if (animal.diet === 'herbivorous') {
        dietPets.classList.add('herbivorous');
    } else {
        dietPets.classList.add('predatory');
    }
    petDescription.append(dietPets);

    let imgDietPet = document.createElement('img');
    imgDietPet.src = animal.meal;
    imgDietPet.alt = animal.diet;
    dietPets.append(imgDietPet);

    return petDescription;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createRandomTestimonialsArray() {
    let testimonialsClone = [...testimonials]
    shuffleArray(testimonialsClone);
    const newTestiminials = testimonialsClone.slice(0, 8);
     newTestiminials.sort((a1, a2) => {
        if (a1.date === a2.date) {
            return 0;
        } else if (a1.date === 'Today') {
            return 1;
        } else {
            return -1;
        }
     })
    return newTestiminials;
}


function createWrapperTestimonials() {
    const testimonialsArray = createRandomTestimonialsArray();


    for (let index = 0; index < testimonialsArray.length; index++) {
        let testimonial = testimonialsArray[index];
        const wrapperTestimonials = document.createElement("div");
        wrapperTestimonials.classList.add('wrapper-testimonials');
        if (index > 3) {
            wrapperTestimonials.classList.add('hidden-user-testimonials');
        }

        const wrapperTestimonialsUser = createWrapperTestimonialsUser(testimonial);
        wrapperTestimonials.append(wrapperTestimonialsUser);

        const reviewContent = createReviewContent(testimonial);
        wrapperTestimonials.append(reviewContent);

        wrapperTestimonialsAll.append(wrapperTestimonials);
    
    }
}

function createWrapperTestimonialsUser(testimonial) {
    let wrapperTestimonialsUser = document.createElement("div");
    wrapperTestimonialsUser.classList.add('wrapper-testimonials-user');

    let imgUser = document.createElement("img");
    imgUser.classList.add('user-photo');
    imgUser.src = testimonial.image;
    imgUser.alt = testimonial.name;
    wrapperTestimonialsUser.append(imgUser);

    let userName = document.createElement("div");
    userName.classList.add('user-name');
    userName.textContent = testimonial.name;
    wrapperTestimonialsUser.append(userName);


    const wrapperUserInfo = createWrapperUserInfo(testimonial);
    wrapperTestimonialsUser.append(wrapperUserInfo);

    return wrapperTestimonialsUser;
}

function createWrapperUserInfo(testimonial) {
    let wrapperUserInfo = document.createElement("div");
    wrapperUserInfo.classList.add('wrapper-user-info');

    let userLocation = document.createElement("div");
    userLocation.classList.add('user-location');
    userLocation.textContent = testimonial.location;

    wrapperUserInfo.append(userLocation);

    let dotTestimonials = document.createElement("div");
    dotTestimonials.classList.add('dot-testimonials');
    dotTestimonials.textContent = '•';

    wrapperUserInfo.append(dotTestimonials);

    let dayOfTestimonials = document.createElement("div");
    dayOfTestimonials.classList.add('day-of-testimonials');
    dayOfTestimonials.textContent = testimonial.date;

    wrapperUserInfo.append(dayOfTestimonials);
    return wrapperUserInfo;
}

function createReviewContent(testimonial) {
    let reviewContent = document.createElement("div");
    reviewContent.classList.add('review-content');
    reviewContent.textContent = testimonial.text;
    return reviewContent;
}