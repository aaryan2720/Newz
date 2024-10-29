import React, { Component } from 'react';

class Newsitem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    const defaultimg = "https://th.bing.com/th?id=OIP.O6dPl1f69eLhIvlx_WH4gQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2";

    return (
      <div className="container my-3 mx-8">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ right: '0', zIndex: '1' }}>
            {source}
          </span>
          <img
            src={imageUrl ? imageUrl : defaultimg}
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                <h6><b>By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</b></h6>
              </small>
            </p>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
