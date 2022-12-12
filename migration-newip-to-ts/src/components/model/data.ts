type Data = {
    articles: {
        urlToImage: string;
        author: string;
        publishedAt: string;
        title: string;
        description: string;
        url: string;
        source: { name: string }
    } [];
    sources: {
        name: string;
        id: string
    } [];
}
export default Data;