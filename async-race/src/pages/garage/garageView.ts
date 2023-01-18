import { Car } from '../../model/car';
import { GarageController } from './garageController';

export class GarageView {
    garageController: GarageController | null;

    constructor(garageController: GarageController | null) {
        this.garageController = garageController;
    }

    public renderGarage(cars: Car[]): void {
        const header = document.querySelector('.header') as HTMLElement;

        const mainElement = document.createElement('main');
        mainElement.className = 'garage';

        const container = document.createElement('div');
        container.className = 'garage__container';

        const carsControlBlock = this.createCarsControlBlock(cars);


        container.append(carsControlBlock);
        mainElement.append(container);
        header.after(mainElement);
    }

    public createCarsControlBlock(cars: Car[]): HTMLElement {
        const carsControlBlock = document.createElement('div');
        carsControlBlock.className = 'garage__cars-control-block';

        const createCarsWrapper = this.createCarsWrapper();
        const updateCarsWrapper = this.createUpdateCarsWrapper();
        const controlCarsWrapper = this.createControlCarsWrapper();
        const raceWrapper = this.createRaceWrapper(cars);

        carsControlBlock.append(createCarsWrapper);
        carsControlBlock.append(updateCarsWrapper);
        carsControlBlock.append(controlCarsWrapper);
        carsControlBlock.append(raceWrapper);

        return carsControlBlock;
    }

    public createCarsWrapper(): HTMLElement {
        const createCarsWrapper = document.createElement('div');
        createCarsWrapper.className = 'garage__wrapper-create-cars';

        const createCarName = document.createElement('input'); //todo

        const createColor = document.createElement('input'); //todo
        createColor.className = 'garage__create-car-color';
        createColor.type = 'color';

        const btnCreateCar = document.createElement('button');
        btnCreateCar.className = 'garage__btn-create-car';
        btnCreateCar.textContent = 'create';
        btnCreateCar.addEventListener('click', (evt) => {
            //todo add values from element
            this.garageController?.addCar('', '');
        })

        createCarsWrapper.append(createCarName);
        createCarsWrapper.append(createColor);
        createCarsWrapper.append(btnCreateCar);

        return createCarsWrapper;
    }

    public createUpdateCarsWrapper(): HTMLElement {
        const updateCarsWrapper = document.createElement('div');
        updateCarsWrapper.className = 'garage__wrapper-update-cars';

        const Inp1 = document.createElement('input'); //todo

        const updateColor = document.createElement('input'); //todo
        updateColor.className = 'garage__update-cfr-color';
        updateColor.type = 'color';

        const btnCreateCar = document.createElement('button');//todo listener
        btnCreateCar.className = 'garage__btn-update-car';
        btnCreateCar.textContent = 'update';

        updateCarsWrapper.append(Inp1);
        updateCarsWrapper.append(updateColor);
        updateCarsWrapper.append(btnCreateCar);

        return updateCarsWrapper;
    }

    public createControlCarsWrapper(): HTMLElement {
        const controlCarsWrapper = document.createElement('div');
        controlCarsWrapper.className = 'garage__wrapper-control-cars';

        const btnRace = document.createElement('button');//todo listener
        btnRace.className = 'garage__btn-race';
        btnRace.textContent = 'race';

        const btnReset = document.createElement('button');//todo listener
        btnReset.className = 'garage__btn-reset';
        btnReset.textContent = 'reset';

        const btnGenerateCars = document.createElement('button');//todo listener
        btnGenerateCars.className = 'garage__btn-generate-cars';
        btnGenerateCars.textContent = 'generate cars';
        //btnGenerateCars.addEventListener('click', )

        controlCarsWrapper.append(btnRace);
        controlCarsWrapper.append(btnReset);
        controlCarsWrapper.append(btnGenerateCars);

        return controlCarsWrapper;
    }

    public createRaceWrapper(cars: Car[]): HTMLElement {
        const raceWrapper = document.createElement('div');
        raceWrapper.className = 'garage__wrapper-race';

        const raceTitleWrapper = this.createRaceTitle(cars.length);
        const racePage = this.createRacePage(1);
        raceWrapper.append(raceTitleWrapper);
        raceWrapper.append(racePage);

        cars.slice(0, 7).forEach(car => {
            const carElement = this.createCarBlock(car);
            raceWrapper.append(carElement);
        });

        return raceWrapper;
    }

    public createCarBlock(car: Car): HTMLElement {
        const carBlock = document.createElement('div');
        carBlock.className = 'garage__car-block';

        const actionWrapper = this.createActionWrapper(car);
        const carDirectionWrapper = this.createCarDirectionWrapper();
        const visualCarWrapper = this.createVisualCarWrapper(car);

        carBlock.append(actionWrapper);
        carBlock.append(carDirectionWrapper);
        carBlock.append(visualCarWrapper);

        return carBlock;
    }

    public createRaceTitle(totalCars: number): HTMLElement {
        const raceTitleWrapper = document.createElement('div');
        raceTitleWrapper.className = 'garage__wrapper-race-title';

        const raceTitle = document.createElement('h2');
        raceTitle.className = 'garage__race-title';
        raceTitle.textContent = 'Garage ';

        const raceCount = document.createElement('p');
        raceCount.className = 'garage__race-count';
        raceCount.textContent =  ` (${totalCars.toString()})`;

        raceTitleWrapper.append(raceTitle);
        raceTitleWrapper.append(raceCount);

        return raceTitleWrapper;
    }

    public createRacePage(pageNumber: number): HTMLElement {
        const racePage = document.createElement('div');
        racePage.className = 'garage__wrapper-race-page';

        const pageTitle = document.createElement('h3');
        pageTitle.className = 'garage__page-title';
        pageTitle.textContent = 'page ';

        const page = document.createElement('p');
        page.className = 'garage__page';
        page.textContent = `#${pageNumber}`;

        racePage.append(pageTitle);
        racePage.append(page);

        return racePage;
    }

    public createActionWrapper(car: Car): HTMLElement {
        const actionWrapper = document.createElement('div');
        actionWrapper.className = 'garage__wrapper-action';

        const btnRemove = document.createElement('button');//todo listener
        btnRemove.className = 'garage__btn-remove';
        btnRemove.textContent = 'remove';

        const btnSelect = document.createElement('button');//todo listener
        btnSelect.className = 'garage__btn-select';
        btnSelect.textContent = 'select';

        const carName = document.createElement('div');
        carName.className = 'garage__care-name';
        carName.textContent = car.name;

        actionWrapper.append(btnRemove);
        actionWrapper.append(btnSelect);
        actionWrapper.append(carName);

        return actionWrapper;
    }

    public createCarDirectionWrapper(): HTMLElement {
        const carDirectionWrapper = document.createElement('div');
        carDirectionWrapper.className = 'garage__wrapper-car-direction';

        const directionAWrapper = document.createElement('button'); //todo listener
        directionAWrapper.className = 'garage__wrapper-direction-a';
        directionAWrapper.textContent = 'A';

        const directionBWrapper = document.createElement('button'); //todo listener
        directionBWrapper.className = 'garage__wrapper-direction-b';
        directionBWrapper.textContent = 'B';

        carDirectionWrapper.append(directionAWrapper);
        carDirectionWrapper.append(directionBWrapper);

        return carDirectionWrapper;
    }

    public createVisualCarWrapper(car: Car): HTMLElement {
        const visualCarWrapper = document.createElement('div');//todo hz
        visualCarWrapper.className = 'garage__wrapper-visual-car';

        const visualCar = document.createElement('div');
        visualCar.className = 'garage__visual-car';
        visualCar.style.backgroundColor = car.color;

        visualCarWrapper.append(visualCar);

        return visualCarWrapper;
    }


}