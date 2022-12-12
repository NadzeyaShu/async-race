import AppLoader from './appLoader';
import Data from '../model/data';

class AppController extends AppLoader {
    getSources(callback: (data: Data) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback,
        );
    }

    getNews(e: Event, callback: (data: Data) => void): void {
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
                        callback,
                    );
                }
                return;
            }
            target = <Element>target.parentNode;
        }
    }
}

export default AppController;
