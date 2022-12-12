import { AppLoader } from './appLoader';
import { NewsData } from '../model/newsData';

export class AppController extends AppLoader implements IController<NewsData> {
    public getSources(callback: (data: NewsData) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: NewsData) => void): void {
        let target = <Element>e.target;
        const newsContainer = <Element>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                    }
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <Element>target.parentNode;
        }
    }
}

export interface IController<T> {
    getSources(callback: (data: T) => void): void;

    getNews(e: Event, callback: (data: T) => void): void;
}
