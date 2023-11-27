import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroller';

class News extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      articles : [],
      loading :false,
      page: 1,
      totalResults: 0,
      pageSize: 99
    };
    document.title = `${this.capitalize(this.props.category)} - Newz🏆`;
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } 

  async componentDidMount() {
    this.fetchNews(); 
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || this.state.loading) {
        return;
    }
    this.fetchMoreNews();
  };

  fetchNews = async () => {
    this.setState({loading: true}); 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4cd29e64d835440f8cb461bfcdf91505
    &page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false, totalResults:parsedData.totalResults}); 
  }

  fetchMoreNews = async () => {
    this.setState({page: this.state.page + 1, loading: true});
    await this.fetchNews();
  };

  render() {
    return (
        <div className='container my-3'>
            <h2>Newz🏆 - Top {this.capitalize(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
                pageStart={0}
                loadMore={this.fetchMoreNews}
                hasMore={this.state.page + 1 <= Math.ceil(this.state.totalResults / this.state.pageSize)}
                loader={<Spinner/>}
            >
                <div className='row'>
                {this.state.articles && this.state.articles.map((element) => {
                    return ( <div className='col-md-3 my-2 mx-3' key={element.url}>
                  <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                )
                })}
                </div>
            </InfiniteScroll>
        </div>
    );
}
}
export default News;

