import { HeaderView } from './headerView';

export class HeaderController {

    private headerView: HeaderView;

    constructor(headerView: HeaderView) {
        this.headerView = headerView;
    }

    public drawHeader(): void {
        this.headerView.createHeader();
    }
}