import { GarageController } from './garage/garageController';
import { GarageView } from './garage/garageView';
import { GarageService } from './garage/garageService';
import { HeaderController } from './components/HeaderController';
import { HeaderView } from './components/headerView';

export class App {

    private garageController: GarageController;
    public headerController: HeaderController;

    constructor() {
        this.headerController = new HeaderController(new HeaderView());
        let garageView = new GarageView(null);
        this.garageController = new GarageController(garageView, new GarageService());
        garageView.garageController = this.garageController;
    }

    public start(): void {
        this.headerController.drawHeader();
        this.garageController.drawPage();
    }
}