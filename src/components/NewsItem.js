import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsURL, author, date, source, mode} = this.props;

    return (
      <div className='my-3'>
        
        <div className="card" style={{border: '0px'}}>
          <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${mode==='light'? 'black': 'white'} text-${mode}`}style={{left: '93%', zIndex: '1'}}>{source}</span>

          <img src={imgUrl? imgUrl: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?size=626&ext=jpg"} className="card-img-top" alt="..."/>
          
          <div className={`card-body bg-${mode}`}>
              <h5 className="card-title" style={{color: mode==='light'? 'black': 'white'}}>{title}...</h5>
              <p className="card-text" style={{color: mode==='light'? 'black': 'white'}}>{description}...</p>
              <p className="card-text" ><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsURL} target="_blank" rel="noreferrer" className={`btn btn-sm btn-${mode==='light'? 'dark': 'light'}`}>Read more</a>
          </div>
        </div>

      </div>
    )
  }
}
