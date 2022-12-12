import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '11aa9879ef574bc3b059fc83859d8311',
        });
    }
}

export default AppLoader;