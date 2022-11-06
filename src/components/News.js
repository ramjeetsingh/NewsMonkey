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
        category: PropTypes.string
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

    captalizeFL = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updatePage() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(20);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updatePage();
    }

    handleNextClick= async () => {
        this.setState({page: this.state.page + 1});
        this.updatePage();
    }

    handlePrevClick= async () => {
        this.setState({page: this.state.page - 1});
        this.updatePage();
    }

    render() {
        return (
        <div className='container my-3'>
            <h2 className='text-center' style={{margin: '30px 0px', marginTop: '90px'}}>Top {this.captalizeFL(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner />}
            <div className="row">
                {
                    !this.state.loading &&
                    this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem 
                                title={element.title? element.title.slice(0, 40): ""} 
                                description={element.description? element.description.slice(0, 90): ""} 
                                imgUrl={element.urlToImage} 
                                newsURL={element.url} 
                                author={element.author? element.author: "Unknown"} 
                                date={element.publishedAt} 
                                source={element.source.name}
                            />
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
