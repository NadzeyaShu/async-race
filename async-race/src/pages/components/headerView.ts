export class HeaderView {

    public createHeader(): void {
        const body = document.body;
        const header = document.createElement('header');
        header.className = 'header';

        const container = document.createElement('div');
        container.className = 'container';

        const headerContainer = document.createElement('div');
        headerContainer.className = 'header__container';

        const btnToGarage = document.createElement('button'); //todo listener
        btnToGarage.className = 'header__btn-to-garage';
        btnToGarage.textContent = 'to garage';

        const btnToWinners = document.createElement('button'); //todo listener
        btnToWinners.className = 'header__btn-to-winners';
        btnToWinners.textContent = 'to winners';

        headerContainer.append(btnToGarage);
        headerContainer.append(btnToWinners);
        container.append(headerContainer);
        header.append(container);
        body.prepend(header);
    }

}