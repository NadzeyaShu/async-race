import { WinnersView } from './winnersView';


export class GarageController {
    private winnersView: WinnersView;

    constructor(winnersView: WinnersView) {
        this.winnersView = winnersView;
    }

    public drawPage(): void {
        //todo call service for get cars
        this.winnersView.renderWinners();
    }
}