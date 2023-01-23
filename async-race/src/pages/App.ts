import { GarageController } from './garage/garageController';
import { GarageView } from './garage/garageView';
import { GarageService } from './garage/garageService';
import { HeaderController } from './components/HeaderController';
import { HeaderView } from './components/headerView';
import { WinnersController } from './winners/winnersController';
import { WinnersView } from './winners/winnersView';
import { WinnersService } from './winners/winnersService';

export class App {
    private readonly garageController: GarageController;
    private readonly headerController: HeaderController;
    private readonly winnersController: WinnersController;

    constructor() {
        this.winnersController = new WinnersController(new WinnersView(), new WinnersService());

        const garageView = new GarageView(null);
        this.garageController = new GarageController(garageView, new GarageService());
        garageView.garageController = this.garageController;

        const headerView = new HeaderView(null);
        this.headerController = new HeaderController(headerView, this.garageController, this.winnersController);
        headerView.headerController = this.headerController;
    }

    public start(): void {
        this.headerController.drawHeader();
        this.garageController.drawPage();
    }
}
