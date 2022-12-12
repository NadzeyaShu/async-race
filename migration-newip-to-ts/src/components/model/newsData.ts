type NewsData = {
    articles: Article[];
    sources: Source[];
};

type Article = {
    urlToImage: string;
    author: string;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    source: { name: string };
};

type Source = {
    name: string;
    id: string;
};

export { NewsData };
export { Article };
export { Source };
