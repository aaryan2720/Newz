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
      pageSize: 99
    };
    document.title = `${this.capitalize(this.props.category)} - Newz `;
    this._isMounted = false;
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async componentDidMount() {
    this._isMounted = true;
    this.fetchNews();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || this.state.loading) {
      return;
    }
    this.fetchMoreNews();
  };

  fetchNews = async () => {
    this.setState({ loading: true });
  
    const apiUrl = process.env.NODE_ENV === 'development'
      ? `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&page=${this.state.page}&pageSize=${this.state.pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      : `/api/news/top-headlines?country=us&category=${this.props.category}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
  
    try {
      let response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let parsedData = await response.json();
      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false });
    }
  };

  fetchMoreNews = async () => {
    if (this.state.loading) return;
    this.setState({ page: this.state.page + 1 });
    await this.fetchNews();
  };

  render() {
    return (
      <div className='container my-3'>
        <h2>
          Newz{' '}
          <span role="img" aria-label="trophy">
            🏆
          </span>
          {' '} - Top {this.capitalize(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMoreNews}
          hasMore={this.state.page + 1 <= Math.ceil(this.state.totalResults / this.state.pageSize)}
          loader={<Spinner />}
        >
          <div className='row'>
            {this.state.articles &&
              this.state.articles.map((element) => (
                <div className='col-md-3 my-2 mx-3' key={`${element.url}-${element.publishedAt}`}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
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
