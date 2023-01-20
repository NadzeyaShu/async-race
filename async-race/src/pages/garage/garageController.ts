import { GarageView } from './garageView';
import { GarageService } from './garageService';

export class GarageController {
    private garageView: GarageView;
    private garageService: GarageService;

    constructor(garageView: GarageView, garageService: GarageService) {
        this.garageView = garageView;
        this.garageService = garageService;
    }

    public drawPage(): void {
        this.garageService.fetchCars(cars=> this.garageView.renderGarage(cars));
    }

    public addCar(name: string, color: string) {
        this.garageService.addCar(name, color, cars => this.garageView.onAddDeleteCar(cars));
    }

    public deleteCar(id: number) {
        this.garageService.deleteCar(id, cars => this.garageView.onAddDeleteCar(cars));
    }
}