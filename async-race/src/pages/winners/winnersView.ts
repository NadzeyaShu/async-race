export class WinnersView {

    public renderWinners(): void {
        const header = document.querySelector('.header') as HTMLElement;

        const mainElement = document.createElement('main');
        mainElement.className = 'winners';

        const container = document.createElement('div');
        container.className = 'winners__container';

        const winnerTitleWrapper = this.createWinnersTitle();
        const winnersCountPage = this.createWinnersCountPage();
        const winnersTable = this.createWinnersTable();
        const changePageWrapper = this.createChangePageWrapper();

        container.append(winnerTitleWrapper);
        container.append(winnersCountPage);
        container.append(winnersTable);
        container.append(changePageWrapper);

        mainElement.append(container);
        header.after(mainElement);
    }

    public createWinnersTitle(): HTMLElement {
        const winnerTitleWrapper = document.createElement('div');
        winnerTitleWrapper.className = 'garage__wrapper-winner-title';

        const winnerTitle = document.createElement('h2');
        winnerTitle.className = 'winners__winner-title';
        winnerTitle.textContent = 'Winners ';

        const winnerCount = document.createElement('p');
        winnerCount.className = 'winners__winner-count';
        winnerCount.textContent = `(${4})`; //todo change

        winnerTitleWrapper.append(winnerTitle);
        winnerTitleWrapper.append(winnerCount);

        return winnerTitleWrapper;
    }

    public createWinnersCountPage(): HTMLElement {
        const winnersCountPage = document.createElement('div');
        winnersCountPage.className = 'winners__wrapper-count-page';

        const pageTitle = document.createElement('h3');
        pageTitle.className = 'winners__page-title';
        pageTitle.textContent = 'page #';

        const page = document.createElement('p');
        page.className = 'winners__page';
        page.textContent = `#${1})`; //todo change

        winnersCountPage.append(pageTitle);
        winnersCountPage.append(page);

        return winnersCountPage;
    }

    public createWinnersTable(): HTMLElement {
        const winnersTable = document.createElement('table');
        winnersTable.className = 'winners__winners-table';

        const winnersHeadTable = this.createWinnersHeadTable();
        const winnersTableElements = this.createWinnersElementsTable(); //todo items

        winnersTable.append(winnersHeadTable);
        winnersTable.append(winnersTableElements);

        return winnersTable;
    }

    public createWinnersHeadTable(): HTMLElement {
        const winnersHeadTable = document.createElement('tr');
        winnersHeadTable.className = 'winners__head-table';

        const winnerCarNumber = document.createElement('th');
        winnerCarNumber.className = 'winners__car-number-title';
        winnerCarNumber.textContent = 'Number';

        const winnerCar = document.createElement('th');
        winnerCar.className = 'winners__car-title';
        winnerCar.textContent = 'Car';

        const winnerCarName = document.createElement('th');
        winnerCarName.className = 'winners__car-name-title';
        winnerCarName.textContent = 'Name';

        const winnerCarWins = document.createElement('th');
        winnerCarWins.className = 'winners__car-wins-title';
        winnerCarWins.textContent = 'Wins';

        const winnerBestTime = document.createElement('th');
        winnerBestTime.className = 'winners__best-time-title';
        winnerBestTime.textContent = 'Best time (seconds)';

        winnersHeadTable.append(winnerCarNumber);
        winnersHeadTable.append(winnerCar);
        winnersHeadTable.append(winnerCarName);
        winnersHeadTable.append(winnerCarWins);
        winnersHeadTable.append(winnerBestTime);

        return winnersHeadTable;
    }

    public createWinnersElementsTable(): HTMLElement {
        const winnersTable = document.createElement('tr');
        winnersTable.className = 'winners__table';

        const winnerCarNumber = document.createElement('td');
        winnerCarNumber.className = 'winners__car-number';
        winnerCarNumber.textContent = ''; //todo

        const winnerCar = document.createElement('td');
        winnerCar.className = 'winners__car';
        winnerCar.textContent = ''; //todo

        const winnerCarName = document.createElement('td');
        winnerCarName.className = 'winners__car-name';
        winnerCarName.textContent = ''; //todo

        const winnerCarWins = document.createElement('td');
        winnerCarWins.className = 'winners__car-wins';
        winnerCarWins.textContent = ''; //todo

        const winnerBestTime = document.createElement('td');
        winnerBestTime.className = 'winners__best-time';
        winnerBestTime.textContent = ''; //todo

        winnersTable.append(winnerCarNumber);
        winnersTable.append(winnerCar);
        winnersTable.append(winnerCarName);
        winnersTable.append(winnerCarWins);
        winnersTable.append(winnerBestTime);

        return winnersTable;
    }

    public createChangePageWrapper(): HTMLElement {
        const changePageWrapper = document.createElement('div');
        changePageWrapper.className = 'winners__wrapper-change-page';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'winners__prev-btn';
        prevBtn.textContent = 'prev';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'winners__next-btn';
        nextBtn.textContent = 'next';

        changePageWrapper.append(prevBtn);
        changePageWrapper.append(nextBtn);

        return changePageWrapper;
    }
}
