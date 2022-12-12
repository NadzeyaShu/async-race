import { AppController, IController } from '../controller/controller';
import { AppView, INewsView } from '../view/appView';
import { NewsData } from '../model/newsData';

export class App {
    private controller: IController<NewsData>;
    private view: INewsView<NewsData>;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const getNewsCallback = (data: NewsData) => this.view.drawNews(data);
        const sources = document.querySelector('.sources');
        sources?.addEventListener('click', (e) => this.controller.getNews(e, getNewsCallback));
        this.controller.getSources((data: NewsData) => this.view.drawSources(data));
    }
}
