import './news.css';

class News {
    draw(data: {
        urlToImage: string;
        author: string;
        publishedAt: string;
        title: string;
        description: string;
        url: string;
        source: { name: string }
    }[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = <DocumentFragment>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            let metaPhoto: HTMLDivElement = <HTMLDivElement>newsClone.querySelector('.news__meta-photo');
            metaPhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            let metaAuthor: HTMLLIElement = <HTMLLIElement>newsClone.querySelector('.news__meta-author');
            metaAuthor.textContent = item.author || item.source.name;

            let metaData: HTMLLIElement = <HTMLLIElement>newsClone.querySelector('.news__meta-date');
            metaData.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            let descriptionTitle: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-title');
            descriptionTitle.textContent = item.title;

            let descriptionSource: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-source');
            descriptionSource.textContent = item.source.name;

            let descriptionContent: HTMLParagraphElement = <HTMLParagraphElement>newsClone.querySelector('.news__description-content');
            descriptionContent.textContent = item.description;

            let readMore: HTMLElement = <HTMLElement>newsClone.querySelector('.news__read-more a');
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });


        let newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
