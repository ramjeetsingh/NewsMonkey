import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        console.log("Constructor was called.")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b454bcb4d5064269b43016afcfbe6814&page=1&pageSize=30";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handleNextClick= async () => {
        console.log("n")

        if (this.state.page+1 > Math.ceil(this.state.totalResults/30)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b454bcb4d5064269b43016afcfbe6814&page=${this.state.page+1}&pageSize=30`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles
            })
        }
    }

    handlePrevClick= async () => {
        console.log("p")

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b454bcb4d5064269b43016afcfbe6814&page=${this.state.page-1}&pageSize=30`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles
        })
    }

  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        <div className="row">
            {
                this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title? element.title.slice(0, 40): ""} description={element.description? element.description.slice(0, 90): ""} imgUrl={element.urlToImage} newsURL={element.url}/>
                    </div>
                })
            }
        </div>
        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} class="btn btn-dark">&larr; Previous</button>
            <button type="button" disabled={this.state.page===Math.ceil(this.state.totalResults/30)} onClick={this.handleNextClick} class="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
