import { HeaderView } from './headerView';
import { GarageController } from '../garage/garageController';
import { WinnersController } from '../winners/winnersController';

export class HeaderController {
    headerView: HeaderView;
    garageController: GarageController;
    winnersController: WinnersController;

    constructor(headerView: HeaderView, garageController: GarageController, winnersController: WinnersController) {
        this.headerView = headerView;
        this.garageController = garageController;
        this.winnersController = winnersController;
    }

    public drawHeader(): void {
        this.headerView.createHeader();
    }

    public drawWinnersPage(): void {
        this.garageController.removePage();
        this.winnersController.drawPage();
    }

    public drawGaragePage(): void {
        this.winnersController.removePage();
        this.garageController.drawPage();
    }
}
