import { GarageView } from './garageView';
import { GarageService } from './garageService';
import { Car } from '../../model/car';

export class GarageController {
    private garageView: GarageView;
    private garageService: GarageService;

    constructor(garageView: GarageView, garageService: GarageService) {
        this.garageView = garageView;
        this.garageService = garageService;
    }

    public drawPage(): void {
        this.garageService.fetchCars(cars => this.garageView.renderGarage(cars));
    }

    public addCar(name: string, color: string) {
        this.garageService.addCar(name, color, cars => this.garageView.onUpdateGarage(cars));
    }

    public deleteCar(id: number) {
        this.garageService.deleteCar(id, cars => this.garageView.onUpdateGarage(cars));
    }

    public saveCarIdForUpdate(id: number) {
        this.garageService.saveCarIdForUpdate(id);
    }

    public updateCar(name: string, color: string) {
        this.garageService.updateCar(name, color, cars => this.garageView.onUpdateGarage(cars));
    }

}