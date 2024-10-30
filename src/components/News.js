import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null, // For error handling
      pageSize: 20
    };
    document.title = `${this.capitalize(this.props.category)} - Newz`;
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true, error: null });
    const apiKey = "4cd29e64d835440f8cb461bfcdf91505";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}`;

    try {
      let response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      let parsedData = await response.json();
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...parsedData.articles],
        loading: false,
        totalResults: parsedData.totalResults
      }));
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false, error: error.message });
    }
  };

  loadMoreNews = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchNews);
  };

  render() {
    const { articles, loading, error, totalResults, pageSize } = this.state;

    return (
      <div className='container my-3'>
        <h2>
          Newz{' '}
          <span role="img" aria-label="trophy">
            🏆
          </span>
          {' '} - Top {this.capitalize(this.props.category)} Headlines
        </h2>

        {error && <p className="text-danger">Failed to load news: {error}</p>}
        {!loading && !articles.length && <p>No articles found.</p>}

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreNews}
          hasMore={this.state.page * pageSize < totalResults}
          loader={<Spinner key={0} />}
        >
          <div className='row'>
            {articles.map((article) => (
              <div className='col-md-3 my-2 mx-3' key={`${article.url}-${article.publishedAt}`}>
                <Newsitem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;