import { Car } from '../../model/car';

export class GarageService {

    public fetchCars(callback: (cars: Car[]) => void) {
        fetch('http://127.0.0.1:3000/garage')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(cars => callback(cars));
    }

    public addCar(name: string, color: string, callback: (cars: Car[]) => void) {
        fetch('http://127.0.0.1:3000/garage', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'name': name, 'color': color }),
            },
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                this.fetchCars(callback);
            });
    }

    public deleteCar(id: number, callback: (cars: Car[]) => void) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ 'id': id}),
            },
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                this.fetchCars(callback);
            });
    }
}