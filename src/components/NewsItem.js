import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsURL} = this.props;

    return (
      <div className='my-3'>
        
        <div className="card" style={{width: "18rem"}}>
        <img src={imgUrl? imgUrl: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?size=626&ext=jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>

      </div>
    )
  }
}
