import { Car } from '../../model/car';

export class GarageService {
    public fetchCars(callback: (cars: Car[]) => void) {
        fetch('http://127.0.0.1:3000/garage')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((cars) => callback(cars));
    }

    public addCar(name: string, color: string, callback: (cars: Car[]) => void) {
        fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, color: color }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            this.fetchCars(callback);
        });
    }

    public deleteCar(id: number, callback: (cars: Car[]) => void) {
        fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            this.fetchCars(callback);
        });
    }

    public saveCarIdForUpdate(id: number): void {
        localStorage.setItem('updateCarId', id.toString());
    }

    public getCarIdForUpdate(): number {
        const carItem = localStorage.getItem('updateCarId');
        if (carItem) {
            return +carItem;
        } else {
            throw new Error();
        }
    }

    public updateCar(name: string, color: string, callback: (cars: Car[]) => void) {
        const carId = this.getCarIdForUpdate();
        fetch(`http://127.0.0.1:3000/garage/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, color: color }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            this.fetchCars(callback);
        });
    }
}
