import { WinnersView } from './winnersView';
import { WinnersService } from './winnersService';

export class WinnersController {
    private winnersView: WinnersView;
    private winnersService: WinnersService;

    constructor(winnersView: WinnersView, winnersService: WinnersService) {
        this.winnersView = winnersView;
        this.winnersService = winnersService;
    }

    public drawPage(): void {
        this.winnersView.renderWinners();
        this.winnersService.fetchWinnersCars(
            (winner) => this.winnersView.renderWinnersElementsTable(winner),
            (total) => this.winnersView.renderWinnersTitle(total)
        );
    }

    public removePage(): void {
        this.winnersView?.deleteWinnersPage();
    }
}
