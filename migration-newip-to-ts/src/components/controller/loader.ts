import { NewsData } from '../model/newsData';

export class Loader {
    private readonly baseLink: string;
    private readonly options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        request: {
            endpoint: string;
            options: object;
        },
        callback: (data: NewsData) => void = defaultCallback
    ): void {
        this.load('GET', request.endpoint, callback, request.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: object, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key as keyof typeof urlOptions];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: (data: NewsData) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

function defaultCallback() {
    console.error('No callback for GET response');
}
