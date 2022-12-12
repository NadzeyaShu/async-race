import { News } from './news/news';
import { Sources } from './sources/sources';
import { Article, NewsData, Source } from '../model/newsData';

export class AppView implements INewsView<NewsData> {
    private news: IVew<Article>;
    private sources: IVew<Source>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export interface INewsView<T> {
    drawNews(data: T): void;

    drawSources(data: T): void;
}

export interface IVew<T> {
    draw(data: T[]): void;
}
