import React, { Component } from 'react';

export default class Newsitem extends Component {

  render() {
    let { title, description, imageURL, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div className="card">
            <span className=" badge rounded-pill bg-danger" style={{display:"flex", justifyContent:"end", position:"absolute", right:"0"}}>
            {source}
          </span></div>
          
          <img src={imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
