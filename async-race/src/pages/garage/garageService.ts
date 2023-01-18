import { Car } from '../../model/car';

export class GarageService {

    fetchCars(callback: (cars: Car[]) => void) {
        fetch('http://127.0.0.1:3000/garage')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(cars => callback(cars));
    }
}