import { Winner } from '../../model/winner';
import { Car } from '../../model/car';

export class WinnersService {
    public fetchWinnersCars(winnersCallback: (winner: Winner) => void, totalCallback: (total: number) => void) {
        const params = [
            ['_page', '0'],
            ['_limit', '5'],
            ['_sort', 'id'],
            ['_order', 'ASC'],
        ];
        const queryParams = new URLSearchParams(params).toString();

        fetch('http://127.0.0.1:3000/winners?' + queryParams)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const headerValue = response.headers.get('X-Total-Count');
                const totalCount = headerValue ? +headerValue : 0;
                totalCallback(totalCount);
                return response.json();
            })
            .then((winners: Winner[]) => {
                winners.forEach((winner) => {
                    this.fillWinnerByCar(winner, winnersCallback);
                });
                return winners;
            });
    }

    fillWinnerByCar(winner: Winner, winnersCallback: (winner: Winner) => void) {
        fetch(`http://127.0.0.1:3000/garage/${winner.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((car: Car) => {
                winner.name = car.name;
                winner.color = car.color;
                winnersCallback(winner);
            });
    }
}
