import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsURL, author, date, source} = this.props;

    return (
      <div className='my-3'>
        
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left: '93%', zIndex: '1'}}>{source}</span>

        <img src={imgUrl? imgUrl: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?size=626&ext=jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>

      </div>
    )
  }
}
