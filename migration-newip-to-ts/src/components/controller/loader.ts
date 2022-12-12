import Data from '../model/data';

class Loader {
    baseLink: string;
    options: {};

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(request: { endpoint: string, options: {} },
            callback: (data: Data) => void = () => {
                console.error('No callback for GET response');
            },
    ): void {
        this.load('GET', request.endpoint, callback, request.options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {}, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            let value = urlOptions[key as keyof typeof urlOptions];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: Data) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
