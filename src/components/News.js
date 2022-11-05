import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps={
        country:'in',
        pageSize: 9,
        category: 'general'
    }

    static defaultTypes={
        country:PropTypes.string,
        pageSize: PropTypes.number,
        country:PropTypes.string
    }

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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b454bcb4d5064269b43016afcfbe6814&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    }

    handleNextClick= async () => {
        console.log("n")

        if (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

        }
        else {
            this.setState({loading: true});
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b454bcb4d5064269b43016afcfbe6814&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    handlePrevClick= async () => {
        console.log("p")

        this.setState({loading: true});

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b454bcb4d5064269b43016afcfbe6814&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        })
    }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin: '30px 0px'}}>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
            {
                !this.state.loading &&
                this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title? element.title.slice(0, 40): ""} description={element.description? element.description.slice(0, 90): ""} imgUrl={element.urlToImage} newsURL={element.url}/>
                    </div>
                })
            }
        </div>
        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
            <button type="button" disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
