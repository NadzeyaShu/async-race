import './news.css';
import { Article } from '../../model/data';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = <DocumentFragment>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto: HTMLDivElement = <HTMLDivElement>newsClone.querySelector('.news__meta-photo');
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor: HTMLLIElement = <HTMLLIElement>newsClone.querySelector('.news__meta-author');
            metaAuthor.textContent = item.author || item.source.name;

            const metaData: HTMLLIElement = <HTMLLIElement>newsClone.querySelector('.news__meta-date');
            metaData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const descriptionTitle: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-title');
            descriptionTitle.textContent = item.title;

            const descriptionSource: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-source');
            descriptionSource.textContent = item.source.name;

            const descriptionContent: HTMLParagraphElement = <HTMLParagraphElement>(
                newsClone.querySelector('.news__description-content')
            );

            descriptionContent.textContent = item.description;

            const readMore: HTMLElement = <HTMLElement>newsClone.querySelector('.news__read-more a');
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
