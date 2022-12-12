import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Data from '../model/data';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const getNewsCallback = (data: Data) => this.view.drawNews(data);
        const sources = document.querySelector('.sources');
        sources?.addEventListener('click', (e) => this.controller.getNews(e, getNewsCallback));
        this.controller.getSources((data: Data) => this.view.drawSources(data));
    }
}

export default App;
